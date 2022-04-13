const memory = document.createElement('template')
memory.innerHTML = `
<div class="xa" >
<div class="draggable">
  <div class="dragger"></div>
  <header><button class="close">X</button></header>
  <p id = "status">Not connected</p>
<form class="form1">
<div class="x" ></div>
<p>
<div class="outPutDiv"> 
<div id="output" class="output"></div>
</div>
 </p>

  <p class="messageSender">
  <label >Send message:</label><br>
<textarea id="message" class="message" rows="3" cols="0">
  
  </textarea>
    <button type="button" id="send_message" class="send_message">Send</button>
    <button type="button" id="reset_message" class="reset_message">Reset Chat</button>

    
  </p>

</form> 
</div>
</div>

<style>
input[type=text] {
    width: 22em;
}
#status.success {
    background: #0c0;
 }
 #status.fail {
    background: #c00;
 }
      
      
.output {
    width: 100%;
    height: 200px;
    background-color: #fff;
    border: 1px solid #aaa;
    overflow: scroll;
    font-size: smaller;
}

.draggable {
    width: 300px;
    height: 200px;
    background: #ccc;
    position: relative;

    border: 2px solid;

    width: 350px;
    resize: both;
    overflow: auto;
    height: 480px;
  
  }
  .draggable.dragging {
    user-select: none;
  }
  
  .dragger {
    height: 75px;
    background: #caa88c;
  
  }
  .dragger::before {
   
    color: #fff;
    margin: 5px;
    display: inline-block;
  }
  .close{
    width: -webkit-fill-available;
  }
  .send_message {
    background:#555;
    color:#fff;
    border:1pxsolid#eee;
    border-radius:20px;
    box-shadow:5px5px5px#eee;
    text-shadow:none;
    position: absolute;
 
    width: 100px;
    text-align: -webkit-center;
    margin-left: 10px;
}
.dragger:focus {
  background: #855a5a;
 }
.reset_message {
    background:#555;
    color:#fff;
    border:1pxsolid#eee;
    border-radius:20px;
    box-shadow:5px5px5px#eee;
    text-shadow:none;
    position: initial;
    width: 100px;
    text-align: -webkit-center;
    margin-left: 10px;
   
}
.send_message:hover {
    background:#016ABC;
    color:#fff;
    border:1pxsolid#eee;
    border-radius:20px;
    box-shadow:5px5px5px#eee;
    text-shadow:none;
}
</style>`

let divO

let socket
const idCounter = 0
let rightStyle = 750
let name

/**
 *The Chat class is a custom HTML element that extends the HTMLElement class.
 */
export class Chat extends window.HTMLElement {
  /**
   * Create a shadow DOM and append the content of the memory.html file to the shadow DOM.
   */
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(memory.content.cloneNode(true))

    this.content = this.shadowRoot.querySelector('.content')

    this.form1 = this.shadowRoot.querySelector('.form1')
    this.message = this.shadowRoot.querySelector('.message')

    this.send_message = this.shadowRoot.querySelector('.send_message')

    this.closee = this.shadowRoot.querySelector('.close')
    this.x = this.shadowRoot.querySelector('.x')
    this.output = this.shadowRoot.querySelector('#output')
    this.status = this.shadowRoot.querySelector('#status')
    this.dragger = this.shadowRoot.querySelector('.dragger')
    this.outPutDiv = this.shadowRoot.querySelector('.outPutDiv')
    this.reset_message = this.shadowRoot.querySelector('.reset_message')
    this.messageid = this.shadowRoot.querySelector('#message')

    this.xa = this.shadowRoot.querySelector('.xa')
    this.Submit = this.shadowRoot.querySelector('.Submit')
    divO = this.outPutDiv
    this.messageSender = this.shadowRoot.querySelector('.messageSender')
  }

  /**
   * The `connectedCallback` function is called when the element is inserted into the DOM.
   */
  connectedCallback () {
    this.render()
    this.messageid.addEventListener('keydown', event => {
      let size = document.getElementsByTagName('chat-result').length
      console.dir(event)
      if (document.getElementsByTagName('chat-result').length > 1) {
        size = document.getElementsByTagName('chat-result').length - 1
      }
      if (event.keyCode === 13) {
        for (let index = 0; index < size; index++) {
          const po = this.output

          this.onMessageEvent(event.path[6].message.value, po, event.path[6].dragger.outerText)
        }
        event.path[6].message.value = ''
      }
    })

    this.reset_message.addEventListener('click', event => {
      this.output.innerHTML = ''
    })

    this.send_message.addEventListener('click', Sevent => {
      let size = document.getElementsByTagName('chat-result').length

      if (document.getElementsByTagName('chat-result').length > 1) {
        size = document.getElementsByTagName('chat-result').length - 1
      }

      for (let index = 0; index < size; index++) {
        const po = document.getElementsByTagName('chat-result')[index].output

        console.dir(Sevent)
        this.onMessageEvent(Sevent.path[6].message.value, po, Sevent.path[6].dragger.outerText)
      }
      this.messageid.value = ''
    })
  }

  /**
   * Check the name and fix the input accordingly.
   */
  render () {
    const ty = document.getElementsByTagName('chat-result')[document.getElementsByTagName('chat-result').length - 1].xa
    ty.setAttribute('id', 'xa' + idCounter)

    console.dir(ty)
    this.xa.style.position = 'absolute'
    this.xa.style.top = '0px'

    this.xa.style.right = rightStyle + 'pX'
    rightStyle = rightStyle - 361
    this.xa.style.width = ty.offsetWidth + 'px'

    this.drag()
    if (localStorage.getItem('userName') === null) {
      this.messageSender.style.display = 'none'
      this.outPutDiv.innerHTML = `  <input class="nameInput" type="text" placeholder="Please Enter Your Name.." >
            <button class="Submit" type="button"><i ></i>Submit</button>
    `

      this.getName(this.dragger)
    } else {
      this.dragger.innerHTML = localStorage.getItem('userName')
      this.output.style.display = 'block'
    }

    this.connectToWebSocket()
    this.message.classList.add('mystyle')
    socket = this.websocket
  }

  /**
   * Get the name input and the submit button.
   *
   * @param {object} element - The element that holds the name input and the submit button.
   */
  getName (element) {
    var bt = this.shadowRoot.querySelector('.Submit')
    name = this.shadowRoot.querySelector('.nameInput')
    var sender = this.shadowRoot.querySelector('.messageSender')

    bt.addEventListener('click', function () {
      if (name !== '') {
        localStorage.setItem('userName', name.value)
        element.innerHTML = name.value
        divO.innerHTML = `  <label>Log: </label><br>
            <div id="output" class="output"></div>
    `
        sender.style.display = 'block'
      } else {
        alert('Please Enter Your Name')
      }
    })
    console.dir(bt)
  }

  /**
   * Make window draggable.
   */
  drag () {
    var x; var y; var target = null
    this.dragger.addEventListener('mousedown', function (e) {
      var clickedDragger = false

      for (var i = 0; e.path[i] !== document.body; i++) {
        if (e.path[i].classList.contains('dragger')) {
          clickedDragger = true
        } else if (clickedDragger && e.path[i].classList.contains('draggable')) {
          target = e.path[i]
          target.classList.add('dragging')
          x = e.clientX - target.style.left.slice(0, -2)
          y = e.clientY - target.style.top.slice(0, -2)
          return
        }
      }
    })
    this.dragger.addEventListener('mouseup', function () {
      if (target !== null) target.classList.remove('dragging')
      target = null
    })
    this.dragger.addEventListener('mousemove', function (e) {
      if (target === null) return
      target.style.left = e.clientX - x + 'px'
      target.style.top = e.clientY - y + 'px'
    })
    this.closee.addEventListener('click', function () {
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
    })
  }

  /**
   * Connect to the WebSocket server.
   */
  connectToWebSocket () {
    this.connect()
  }

  /**
   * Connect to the WebSocket server.
   */
  connect () {
    const parent = this.output
    this.websocket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket')
    /**
     * A Callback function that is called when the connection is open.
     */
    this.websocket.onopen = () => {
      this.status.className = 'success'
      this.status.innerHTML = 'Connected to server'
    }
    /**
     * A callback function that is called when a message is received from the server.
     *
     * @param {object} event The event object contains the message received from the server.
     */
    this.websocket.onmessage = function (event) {
      var json = JSON.parse(event.data)
      if (json.type === 'message') {
        console.log(json)
        const div = document.createElement('div')
        div.classList.add('message')
        var currentdate = new Date()
        const timestamp = currentdate.toLocaleTimeString()
        div.style.color = '#000'

        div.innerHTML += `<span class="timestamp"> ( ${timestamp} ) </span> <b>${json.username} : </b> ${json.data}`
        parent.appendChild(div)
      }
    }
    /**
     * Callback function that is called when the connection is closed.
     */
    this.websocket.onclose = () => {
      this.status.className = 'fail'
      this.status.innerHTML = 'Disconnected from server'
    }
  }

  /**
   * It sends a message to the server.
   *
   * @param {string} message - The message that was sent by the user.
   * @param {object} outy - The output element to scroll.
   * @param {string} userName - The name of the user who sent the message.
   */
  onMessageEvent (message, outy, userName) {
    var data = {
      type: 'message',
      data: `${message}`,
      username: `${userName}`,
      channel: 'my, not so secret, channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }

    if (!socket || socket.readyState === 3) {

    } else {
      socket.send(JSON.stringify(data))

      outy.scrollTop = outy.scrollHeight
    }
  }
}
window.customElements.define('chat-result', Chat)
