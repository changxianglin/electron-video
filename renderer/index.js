const { ipcRenderer } = require('electron')
const { $ } = require('./helper')

$('add-music-button').addEventListener('click', () => {
  ipcRenderer.send('add-music-window', 'add music')
})

// window.addEventListener('DOMContentLoaded', () => {
//   ipcRenderer.send('message', 'start event')
//   ipcRenderer.on('reply', (event, arg) => {
//     console.log('repose 收到', arg)
//     document.getElementById('message').innerText = arg
//   })
// })
