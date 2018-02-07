(() => {
  document.getElementById('button-new-tab').addEventListener('click', e => {
    window.chrome.windows.create({
      url: 'https://am.i.mullvad.net',
      incognito: true
    })
  })
})()
