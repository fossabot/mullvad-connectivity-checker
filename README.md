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
* Install dependencies: 
	* `yarn` or `npm install`
* Run add-on in isolated Firefox instance using [web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext):
	* `yarn web-ext` or `npm run web-ext`
* Lint JavaScript with Prettier through ESLint:
	* `yarn lint-js` or `npm run lint-js`
* Lint add-on:
	* `yarn lint-addon` or `npm run lint-addon`
* Lint both JavaScript & add-on:
	* `yarn lint` or `npm run lint`
* Check whether the ESLint configuration contains rules that are unnecessary or conflict with Prettier:
	* `yarn eslint-check` or `npm run eslint-check`
* Check dependencies for any known vulnerabilities:
	* `yarn vuln-check` or `npm run vuln-check`
* Bundle add-on into a zip file for distribution:
	* `yarn bundle` or `npm run bundle`
