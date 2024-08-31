console.log('Hello, world!');

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    console.log('click')
  window.electronAPI.openDetail()
  //window.electronAPI.playGame()
})

function showDetail() {
    console.log('showDetail')
    window.electronAPI.openDetail()
}