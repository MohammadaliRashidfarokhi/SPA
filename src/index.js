import { MemoryGame } from './Memory.js'
import { Alarm } from './alarm.js'
import { Chat } from './webSocketChat.js'

const main = document.querySelector('.render')
const imgXO = document.querySelector('#memory')
const alarm = document.querySelector('#alarm')
const chat = document.querySelector('#Chat')

imgXO.addEventListener('click', e => {
  main.appendChild(new MemoryGame())
})
alarm.addEventListener('click', e => {
  main.appendChild(new Alarm())
})

chat.addEventListener('click', e => {
  main.appendChild(new Chat())
})
