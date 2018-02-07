(() => {
  const amIMullvad = 'https://am.i.mullvad.net'

  const openNewTabTo = url => {
    window.chrome.tabs.create({
      active: true,
      url: url
    })
  }

  const openNewPrivateWindowTo = url => {
    window.chrome.windows.create({
      url: amIMullvad,
      incognito: true
    })
  }

  document.getElementById('button-new-tab')
    .addEventListener('click', e => {
      openNewPrivateWindowTo(amIMullvad)
    })

  document.getElementById('button-check-connection')
    .addEventListener('click', e => {
      openNewTabTo(amIMullvad)
    })
})()
