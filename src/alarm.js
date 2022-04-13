const alarm = document.createElement('template')
alarm.innerHTML = `

<div class="draggable">
<div tabindex="0" id="draggerID" class="dragger"></div>
<header><button class="close">X</button></header>


<div id="ctime">
<h1 class="header">THE CURRENT TIME</h1>
<div class="square">
  <div class="digits" id="chr">00</div>
  <div class="text">HR</div>
</div>
<div class="square">
  <div class="digits" id="cmin">00</div>
  <div class="text">MIN</div>
</div>
<div class="square">
  <div class="digits" id="csec">00</div>
  <div class="text">SEC</div>
</div>
</div>

<div id="tpick">
<h1 class="header">
  SET ALARM
</h1>
<div id="clock"></div>
<div id="tpick-m"></div>
<div id="tpick-s"></div>
<div class="alarmTime">

<input  class="onChange"   name="alarmTime" type="datetime-local" step="2">

</div>
<div>

   
    <button type="button"  class="tset">Set alarm</button>

  
    <button  class="clear">Clear alarm</button>
</div>
</div>

<style>

#ctime, #tpick {
  font-family: Impact, sans-serif;
}
.header {
  text-align: center;
  font-weight: normal;
  margin: 5px 0 10px 0;
}

#ctime {
  margin: 0 auto;
  max-width: 350px;
  padding: 10px;
  background: #000;
  text-align: center;
}
.alarmTime{
    padding-bottom: 10px;
    text-align: center;
    font-weight: normal;
    margin: 5px 0 10px 0;
}

#ctime .header {
  color: #c61d1d;
}
#ctime .square {
  display: inline-block;
  padding: 10px;
  margin: 5px;
}
#ctime .digits {
  font-size: 24px;
  background: #fff;
  color: #000;
  padding: 20px 10px;
  border-radius: 5px;
}
#ctime .text {
  margin-top: 10px;
  color: #ddd;
}

/* (C) TIME PICKER */
#tpick {
  margin: 0 auto;
  max-width: 350px;
  padding: 10px;
  background: #f2f2f2;
  white-space: nowrap;
}
#tpick-h, #tpick-m, #tpick-s {
  display: inline-block;
  width: 32%;
}
#tpick select {
  box-sizing: padding-box;
  width: 100%;
  font-size: 1.2em;
  font-weight: bold;
  margin: 20px 0;
}
#tset, #clear {
  box-sizing: padding-box;
  width: 50%;
  background: #3368b2;
  color: #fff;
  padding: 10px;
  border: 0;
  cursor: pointer;
}
#tset:disabled, #clear:disabled {
  background: #aaa;
  color: #888;
}
div{
    text-align: center;
    font-weight: normal;
    margin: 5px 0 10px 0;
}
button{
    display: inline-block;
    padding: 0 10px;
    margin: 5px;
    background-color: #316594;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    text-shadow: 1px 1px #333;
    font-size: .75em;
    color: #fff;
}
button:hover {
  background-color: #c61d1d; 
  color: white;
}
.dragger:focus {
  background: #855a5a;
 }
 
 
.draggable {
    width: fit-content;
    height: fit-content;
    background: #ccc;
    position: relative;
}

  }
  .draggable.dragging {
    user-select: none;
  }
  .dragger {
    height: 75px;
    background: #caa88c;
    width: 400px;
    color: WHITE;
  }
  .dragger::before {
 
    color: #fff;
    margin: 5px;
    display: inline-block;
  }
und: #855a5a;
   }
</style>
`
/**
 *The Alarm class is a custom HTML element that extends the HTMLElement class.
 */
export class Alarm extends window.HTMLElement {
  /**
   * Create a shadow DOM and append the content of the memory.html file to the shadow DOM.
   */
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(alarm.content.cloneNode(true))

    this._cards = []
    this.content = this.shadowRoot.querySelector('.content')
    this.clock = this.shadowRoot.querySelector('#clock')
    this.chr = this.shadowRoot.querySelector('#chr')
    this.tset = this.shadowRoot.querySelector('.tset')
    this.csec = this.shadowRoot.querySelector('#csec')
    this.cmin = this.shadowRoot.querySelector('#cmin')
    this.onChange = this.shadowRoot.querySelector('.onChange')
    this.hour = null
    this.minutes = null
    this.seconds = null
    this.alarmTime = null
    this.alarmTimeout = null
    this.setalarm = null
    this.clear = this.shadowRoot.querySelector('.clear')
    this.closee = this.shadowRoot.querySelector('.close')
    this.dragger = this.shadowRoot.querySelector('.dragger')
    this.audio = new Audio('/audio/alarm.wav')
  }

  /**
   * The `connectedCallback` function is called when the element is inserted into the DOM.
   */
  connectedCallback () {
    this.render()
  }

  /**
   * Render and start the game, add event listeners.
   */
  render () {
    /* Update the time on every 1 second. */
    setInterval(function () { this.updateTime() }.bind(this), 1000)
    this.dragger.addEventListener('focusin', this.focus.bind(this))

    var x; var y; var target = null
    this.dragger.addEventListener('mousedown', function (e) {
      var clickedDragger = false
      console.log(e.path)
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
    this.tset.addEventListener('click', this.setAlarm.bind(this))
    this.onChange.addEventListener('change', this.setAlarmTime.bind(this))
    this.clear.addEventListener('click', this.clearAlarm.bind(this))
  }

  /**
   * The function updates the time on the webpage.
   */
  updateTime () {
    const date = new Date()
    date.toLocaleString('en-GB')

    this.hour = date.getHours()

    this.minutes = date.getMinutes()
    this.seconds = date.getSeconds()

    this.chr.innerHTML = this.hour
    this.cmin.innerHTML = this.minutes
    this.csec.innerHTML = this.seconds
  }

  /**
   * This function sets the alarm time to the value of the input field.
   *
   * @param {object} value - The value of the input element.
   */
  setAlarmTime (value) {
    this.alarmTime = value.target.value

    this.setalarm = this.alarmTime
  }

  /**
   * Set alarm according to the time set by the user.
   */
  setAlarm () {
    const current = new Date()
    const timeToAlarm = new Date(this.alarmTime)

    if (timeToAlarm > current) {
      const timeout = timeToAlarm.getTime() - current.getTime()
      console.log(this.audio)
      this.alarmTimeout = setTimeout(() => this.audio.play(), timeout)
      alert('Alarm set')
    }
  }

  /**
   * Clear the alarm by stopping the alarm audio and clearing the alarm timeout.
   */
  clearAlarm () {
    this.audio.pause()
    if (this.alarmTimeout) {
      clearTimeout(this.alarmTimeout)
      alert('Alarm cleared')
    }
  }
}

window.customElements.define('alarm-result', Alarm)
