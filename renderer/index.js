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

const renderListHTML = (tracks) => {
  const tracksList = $('tracksList')
  const tracksListHTML = tracks.reduce((html, track) => {
    html += `<li class="row music-track list-group-item d-flex justify-content-between align-items-center>
        <div class="col-10">
          <i class="fa fa-music mr-2 text-secondary"></i>
          <b>${track.fileName}</b>
        </div>
        <div class="col-2">
          <i class="fa fa-play mr-3"></i>
          <i class="fa fa-trash-o"></i>
        </div>
    </li>`
    return html
  }, '')
  const emptyTrackHTML = '<div class="alert alert-primay">none music please add</div>'
  tracksList.innerHTML = tracks.length ? `<ul class="list-group">${tracksListHTML}</ul>` : emptyTrackHTML
}

ipcRenderer.on('getTracks', (event, tracks) => {
  console.log('receive tracks', tracks)
  renderListHTML(tracks)
})