# Mullvad Connectivity Checker

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
	* [yarn](https://yarnpkg.com/en/) (optional)
	* [npm-check-updates](https://github.com/tjunnone/npm-check-updates)
		* `yarn global add npm-check-updates` or `npm install --global npm-check-updates`
* Install dependencies: 
	* `yarn` or `npm install`
* Run add-on in isolated Firefox instance using [web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext):
	* `yarn web-ext` or `npm run web-ext`
* Run linters, vulnerability check, and then bundle:
	* `yarn dist` or `npm run dist`
* More script commands can be found in the [package.json](https://github.com/nitrohorse/mullvad-connectivity-checker/blob/master/package.json)...
