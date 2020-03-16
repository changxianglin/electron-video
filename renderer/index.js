const { ipcRenderer } = require('electron')
const { $ } = require('./helper')

const musicAudio = new Audio()
let allTracks 
let currentTracks
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
          <i class="fa fa-play mr-3" data-id="${track.id}"></i>
          <i class="fa fa-trash-o" data-id="${track.id}"></i>
        </div>
    </li>`
    return html
  }, '')
  const emptyTrackHTML = '<div class="alert alert-primay">none music please add</div>'
  tracksList.innerHTML = tracks.length ? `<ul class="list-group">${tracksListHTML}</ul>` : emptyTrackHTML
}

ipcRenderer.on('getTracks', (event, tracks) => {
  console.log('receive tracks', tracks)
  allTracks = tracks
  renderListHTML(tracks)
})

$('tracksList').addEventListener('click', (event) => {
  event.preventDefault()
  const { dataset, classList } = event.target
  const id = dataset && dataset.id

  if(id && classList.contains('fa-play')) {
    console.log('播放')
    // 从这里播放音乐
    if(currentTracks && currentTracks.id === id) {
      // 继续播放音乐
      musicAudio.play()
    } else {
      // 播放新歌曲、还原图标
      currentTracks = allTracks.find(track => track.id === id)
      musicAudio.src = currentTracks.path
      musicAudio.play()
      const resetIconEle = document.querySelector('.fa-pause')
      console.log('新歌曲', resetIconEle)
      if(resetIconEle) {
        resetIconEle.classList.replace('fa-pause', 'fa-play')
      }
    }
    classList.replace('fa-play', 'fa-pause')
  } else if(id && classList.contains('fa-pause')) {
    console.log('暂停')
    // 从这里暂停音乐
      musicAudio.pause()
      classList.replace('fa-pause', 'fa-play')
  } else if(id && classList.contains('fa-trash-o')) {
    // 从这里删除音乐
    ipcRenderer.send('delete-track', id)
  }
})