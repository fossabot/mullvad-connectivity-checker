# Mullvad Connectivity Checker

[![devDependency Status](https://david-dm.org/nitrohorse/mullvad-connectivity-checker/dev-status.svg)](https://david-dm.org/nitrohorse/mullvad-connectivity-checker?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/nitrohorse/mullvad-connectivity-checker/badge.svg?targetFile=package.json)](https://snyk.io/test/github/nitrohorse/mullvad-connectivity-checker?targetFile=package.json)

Browser extension that checks every minute that you are connected to a Mullvad VPN server or not. Powered by [Mullvad](https://am.i.mullvad.net/api). Two checkmarks if you're connected through the [SOCKS5 proxy](https://mullvad.net/en/guides/socks5-proxy/), one checkmark if not.

![alt-text](https://i.imgur.com/XSOgj74.png)

![alt-text](https://i.imgur.com/n2Ij9b5.png)

## Download
* Firefox: https://addons.mozilla.org/en-US/firefox/addon/mullvad-connectivity-checker/

## Install Locally
* Firefox: [temporary](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)
* Chrome: [permanent](https://superuser.com/questions/247651/how-does-one-install-an-extension-for-chrome-browser-from-the-local-file-system/247654#247654)

## Develop Locally
* Clone the repo
* Install tools:
	* [Node.js](https://nodejs.org/en/)
	* [yarn](https://yarnpkg.com/en/)
* Install dependencies: 
	* `yarn`
* Run add-on in isolated Firefox instance using [web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext):
	* `yarn start`
* Package for distribution:
	* `yarn bundle`
* More script commands can be found in the [package.json](https://github.com/nitrohorse/mullvad-connectivity-checker/blob/master/package.json)...
