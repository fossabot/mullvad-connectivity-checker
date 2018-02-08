(() => {
  const toggleElement = document.querySelector('input[name=protectionsToggle]')
  const toggleTextElement = document.getElementById('toggle-text')
  const amIMullvad = 'https://am.i.mullvad.net'
  const labelProtectionsOn = 'Protections On'
  const labelProtectionsOff = 'Protections Off'
  const webRTCDisabled = 'disable_non_proxied_udp'
  const webRTCEnabled = 'default'

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

  const enableWebRTC = () => {
    window.chrome.privacy.network.webRTCIPHandlingPolicy.set({
      value: webRTCEnabled
    })

    window.chrome.privacy.network.peerConnectionEnabled.set({
      value: true
    })
  }

  const disableWebRTC = () => {
    window.chrome.privacy.network.webRTCIPHandlingPolicy.set({
      value: webRTCDisabled
    })

    window.chrome.privacy.network.peerConnectionEnabled.set({
      value: false
    })
  }

  const getWebRTCIPHandlingPolicyPromise = () => {
    return window.browser.privacy.network.webRTCIPHandlingPolicy.get({})
  }

  const getPeerConnectionEnabledPromise = () => {
    return window.browser.privacy.network.peerConnectionEnabled.get({})
  }

  toggleElement.addEventListener('change', () => {
    if (toggleElement.checked) {
      disableWebRTC()
      toggleTextElement.textContent = labelProtectionsOn
      toggleTextElement.style.backgroundColor = 'transparent'
    } else {
      enableWebRTC()
      toggleTextElement.textContent = labelProtectionsOff
      toggleTextElement.style.backgroundColor = '#7b2120'
    }
  })

  // Check if protections are already on
  ;(() => {
    Promise.all([
      getWebRTCIPHandlingPolicyPromise(),
      getPeerConnectionEnabledPromise()
    ]).then(values => {
      if (values[0].value === webRTCDisabled && values[1].value === false) {
        toggleElement.checked = true
        toggleTextElement.textContent = labelProtectionsOn
        toggleTextElement.style.backgroundColor = 'transparent'
      }
    })
  })()
})()
