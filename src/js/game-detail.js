

const backMenuButton = document.getElementById('go-back-menu')

backMenuButton.addEventListener('click', () => {
    console.log('click')
  //window.electronAPI.openDetail()
  window.electronAPI.openMenu()
})
