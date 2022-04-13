const memory = document.createElement('template')
memory.innerHTML = `

<div  class="draggable">
  <div tabindex="0" class="dragger"></div>
  <header><button class="close">X</button></header>

<div class="content">
  <div class="icon"><i class='bx bx-move'></i></div>

  <div id="content"  class="content">
<div class="game">
<div class="container">
<div class="row">
<button class="button-50 four">2X2</button>
<br>
<button class="button-50 eight">2X4</button>
<br>
<button class="button-50 sixteen">4x4</button>
</div>
<div id="boxes" class="boxes" >

</div>
</div>
</div>
</div>
</div>
</div>

<style>
h1 {
    text-align: center;
}

<button class="button-50" role="button">Button 50</button>

h3 {
    color: green;
}
.item {
    position: relative;
 
}
.content{
    container-type: inline-size;
    background-color: #f1f1f1;
    width: 406px;
}
.boxes {
    display: grid; 
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0px 0px; 
    border: 1px solid green;
    width: fit-content;
    height:350px;
    
}

div boxes:hover {
    cursor: pointer;
    background-color: #ccc;
}

.imagesHolders{
    
        outline: 1px solid black;
        width: 201px;
        text-align: center;
        font-size: 5em;
        background-color: #eee;
        background-repeat: no-repeat;
        cursor: pointer;
    
}
.row{
    display: flex;
}
#card {
    box-shadow: 9px 7px 40px -6px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    width: fit-content;
    padding: 0;
    height: fit-content;
    min-height: 300px;
    margin: 20px;
    border-radius: 5px;
    position: relative;
}
img{
    display: inline-block;
    height: 154px;
    width: 146px;
}

  .draggable {
    width: 300px;
    height: 200px;
    background: #ccc;
    position: relative;
    

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

.button-50 {
  appearance: button;
  background-color: #000;
  background-image: none;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: #fff 4px 4px 0 0,#000 4px 4px 0 1px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: ITCAvantGardeStd-Bk,Arial,sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 0 5px 10px 0;
  overflow: visible;
  padding: 12px 40px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;

}
.close{
    width: 400px;
}

.button-50:focus {
  text-decoration: none;
}

.button-50:hover {
  text-decoration: none;
}

.button-50:active {
  box-shadow: rgba(0, 0, 0, .125) 0 3px 5px inset;
  outline: 0;
}

.button-50:not([disabled]):active {
  box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
  transform: translate(2px, 2px);
}
.dragger:focus {
  background: #855a5a;
 }
 
.focus{
  background-color: #caa88c;
}
@media (min-width: 768px) {
  .button-50 {
    padding: 12px 50px;
  }
}
</style>
`

let boxArray
const size = []
let moves = 0
var t = []
var check = []

/**
 *The MemoryGame class is a custom HTML element that extends the HTMLElement class.
 */
export class MemoryGame extends window.HTMLElement {
  /**
   * Create a shadow DOM and append the content of the memory.html file to the shadow DOM.
   */
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(memory.content.cloneNode(true))
    this.content = this.shadowRoot.querySelector('.content')

    this.attempts = 0

    this.images = this.shadowRoot.querySelector('.boxes')

    this.game = this.shadowRoot.querySelector('.game')
    this.numberOfCards = 0
    this.img = this.shadowRoot.querySelector('#boxes')
    this.header = this.shadowRoot.querySelector('header')
    this.remover = false
    this.numberOfCards = 0
    this.closee = this.shadowRoot.querySelector('.close')
    this.dragger = this.shadowRoot.querySelector('.dragger')
    this.contentID = this.shadowRoot.querySelector('#content')
    boxArray = []
    this.row = this.shadowRoot.querySelector('.row')
    this.button50 = this.shadowRoot.querySelectorAll('.button-50')
    this.imagesHolders = this.shadowRoot.querySelectorAll('.imagesHolders')
    this.tracker = -1
    this.keyTrackerToggler = true
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
    this.gameSize()
    this.startGame()

    for (let index = 0; index < this.button50.length; index++) {
      this.button50[index].addEventListener('click', this.gameSize.bind(this))
    }
  }

  /**
   * Shuffle array's elements.
   *
   * @param {Array} array - Array to shuffle.
   * @returns {Array} Shuffled array.
   */
  shuffle (array) {
    var currentIndex = array.length
    var temporaryValue
    var randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  /**
   * This function is used to generate the grid of cards.
   */
  gameSize () {
    for (let index = 0; index < this.button50.length; index++) {
      this.button50[index].addEventListener('click', event => {
        if (event.target.className === 'button-50 four') {
          size.push(2)
          size.push(2)
          this.images.style.gridTemplateColumns = ' 1fr 1fr;'
          this.generateView(2, 2, this.img)
          this.toggleClickable2()
        } else if (event.target.className === 'button-50 eight') {
          size.push(2)
          size.push(4)
          this.generateView(2, 4, this.img)
          this.toggleClickable2()
        } else if (event.target.className === 'button-50 sixteen') {
          size.push(4)
          size.push(4)
          this.images.style.gridTemplateColumns = ' 1fr 1fr 1fr 1fr'
          this.images.style.gridTemplateRows = ' 1fr 1fr 1fr 1fr'
          this.dragger.style.width = '804px'
          this.closee.style.width = '804px'
          this.contentID.style.width = '0px'
          this.contentID.style.width = 'fit-content'
          this.row.style.flexWrap = 'nowrap'
          this.row.style.alignContent = 'space-around'
          this.row.style.justifyContent = 'space-between'
          this.numberOfCards = 16
          this.generateView(4, 4, this.img)
          this.toggleClickable2()
        } else { }
        return size
      })
    }
  }

  /**
   * Append generated cards to the container.
   *
   * @param {number} rows - The number of rows.
   * @param {number} cols - The number of columns in the grid.
   * @param {object} container - The element that will contain the generated HTML.
   */
  generateView (rows, cols, container) {
    for (let index = 0; index < this.button50.length; index++) {
      this.button50[index].disabled = true
    }

    var boxesChildrens
    const tot = (rows * cols)
    this.numberOfCards = 2
    this.pics = this.getPictures(tot)

    for (let i = 0; i < this.pics.length; i++) {
      const newDiv = document.createElement('div')
      newDiv.classList.add('imagesHolders')

      newDiv.innerHTML = '?'

      const img = document.createElement('img')

      img.src = '/Images/' + this.pics[i] + '.png'
      img.id = i
      img.className = 'item'
      img.style.display = 'none'

      container.append(newDiv)
      newDiv.append(img)
    }

    var cont = this.shadowRoot.querySelectorAll('.container')[this.shadowRoot.querySelectorAll('.container').length - 1]
    this.imagesHolders = this.shadowRoot.querySelectorAll('.imagesHolders')

    cont.setAttribute('id', 'containerIMG' + moves++)
    boxesChildrens = this.shadowRoot.querySelectorAll('#boxes')[0].children
    this.remover = true
    for (var i = 0; i < boxesChildrens.length; i++) {
      boxesChildrens[i].addEventListener('click', this.HandleClick.bind(this))

      this.toggleClickable()
    }

    this.key()
  }

  /**
   * Checks what key the user clicked and put or remove focus from the card according to the key.
   */
  key () {
    document.addEventListener('keydown', (event) => {
      if (this.tracker >= -1 && this.tracker <= this.imagesHolders.length - 1) {
        if (event.keyCode === 37 && this.tracker >= 1) {
          this.tracker--
          this.imagesHolders[this.tracker].classList.add('focus')
          this.imagesHolders[(this.tracker + 1)].classList.remove('focus')
        }

        if (event.keyCode === 39 && this.tracker < this.imagesHolders.length - 1) {
          this.tracker++
          this.imagesHolders[this.tracker].classList.add('focus')

          if (this.tracker > 0) {
            this.imagesHolders[(this.tracker - 1)].classList.remove('focus')
          }
        }

        if (event.keyCode === 13 && this.tracker >= 0) {
          console.log(check.length)
          if (check.length <= 1) {
            this.imagesHolders[this.tracker].click()
          }
        }
      }
    }, false)
  }

  /**
   * Start game and set draggable to the window.
   */
  startGame () {
    var x
    var y
    var target = null
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
      if (target !== null) { target.classList.remove('dragging') }
      target = null
    })
    this.dragger.addEventListener('mousemove', function (e) {
      if (target === null) { return }
      target.style.left = e.clientX - x + 'px'
      target.style.top = e.clientY - y + 'px'
    })
    this.closee.addEventListener('click', function () {
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
    })
  }

  /**
   * Toggle the pointer events of all cards.
   */
  toggleClickable2 () {
    var box = this.shadowRoot.querySelectorAll('.row')[0].children

    for (var i = -1; i < box.length; i++) {
      i++

      if (box[i].style.pointerEvents === 'none') {
        box[i].style.pointerEvents = ''
      } else {
        box[i].style.pointerEvents = 'none'
      }
    }
  }

  /**
   * Toggle the pointer events of all cards.
   */
  toggleClickable () {
    console.log('🚀 ~ file: Memory2.js ~ line 450 ~ MemoryGame ~ toggleClickable ~  this.keyTrackerToggler', this.keyTrackerToggler)
    var box = this.shadowRoot.querySelectorAll('.boxes')[0].children

    for (var i = 0; i < box.length; i++) {
      if (box[i].style.pointerEvents === 'none') {
        box[i].style.pointerEvents = ''
      } else {
        box[i].style.pointerEvents = 'none'
      }
    }
    this.keyTrackerToggler = true
    this.iniArray()
  }

  /**
   * It creates a random array of numbers.
   *
   * @param {number} total - The total number of pictures to be generated.
   * @returns {Array} An array of numbers.
   */
  getPictures (total) {
    var array = []
    var i
    var size = total / 2
    for (i = 1; i <= size; i += 1) {
      array.push(i)
      array.push(i)
    }

    for (i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    var currentIndex = array.length
    var temporaryValue
    var randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  /**
   * Handle clicked element.
   *
   * @param {object} event - The game object.
   */
  async HandleClick (event) {
    this.attempts++

    event.preventDefault()
    var clicked = event.target

    t.push(event.target.parentElement.parentElement.id)

    clicked.style.fontSize = '0em'
    clicked.children[0].style.display = ' inline-block'
    check.push(clicked.children[0])

    if (check.length === 2 || check.length === 3 || check.length === 4) {
      this.keyTrackerToggler = false

      switch (check.length) {
        case 2:
          if (t[0] === t[1]) {
            if (check[0].src === check[1].src) {
              this.toggleClickable()

              check = []
              t = []
            } else {
              setTimeout(() => {
                check[0].style.display = 'none'
                check[0].parentElement.fontSize = '5em'

                check[1].style.display = 'none'
                check[1].parentElement.fontSize = '5em'

                this.toggleClickable()
                check = []
                t = []
              }, 3000)
            }
            this.toggleClickable()
          }

          break

        case 3:
          if (t[0] === t[2]) {
            if (check[0].src === check[2].src) {
              this.toggleClickable()
            } else {
              setTimeout(() => {
                check[0].style.display = 'none'
                check[0].parentElement.fontSize = '5em'

                check[2].style.display = 'none'
                check[2].parentElement.fontSize = '5em'

                this.toggleClickable()
              }, 3000)
            }
            this.toggleClickable()
          }

          break
        case 4:
          if (t[0] === t[2]) {
            if (check[0].src === check[2].src) {
              this.toggleClickable()
            } else {
              setTimeout(() => {
                check[0].style.display = 'none'
                check[0].parentElement.fontSize = '5em'

                check[2].style.display = 'none'
                check[2].parentElement.fontSize = '5em'

                this.toggleClickable()
              }, 3000)
            }
            this.toggleClickable()
          }
          if (t[1] === t[3]) {
            if (check[1].src === check[3].src) {
              this.toggleClickable()
              check = []
              t = []
            } else {
              setTimeout(() => {
                check[1].style.display = 'none'
                check[1].parentElement.fontSize = '5em'

                check[3].style.display = 'none'
                check[3].parentElement.fontSize = '5em'

                this.toggleClickable()
                check = []
                t = []
              }, 3000)
            }
          }
          this.toggleClickable()
          break
      }
    }
  }

  /**
   * Check for win.
   */
  iniArray () {
    boxArray = []
    var box = this.shadowRoot.querySelectorAll('.boxes')[0].children

    for (var i = 0; i < box.length; i++) {
      boxArray.push(box[i].childNodes[1].style.cssText)
    }
    if (checkArrayEqualElements(boxArray) && boxArray[0] === 'display: inline-block;') {
      this.shadowRoot.querySelector('.dragger').innerHTML = 'YOU WINN WITH ' + this.attempts + ' ATTEMPTS'
      this.closee.removeChild(this.parentNode.parentNode)
    }
  }
}

window.customElements.define('memory-game', MemoryGame)

/**
 * Given an array, check if all elements are equal to the first element.
 *
 * @param {Array} array - The array to check.
 * @returns {boolean} a Boolean value.
 */
function checkArrayEqualElements (array) {
  if (typeof array !== 'undefined') {
    var firstElement = array[0]
    return array.every(function (element) {
      return element === firstElement
    })
  }
  return 'Array is Undefined'
}
