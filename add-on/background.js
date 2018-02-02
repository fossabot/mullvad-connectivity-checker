(function() {
	'use strict';

	const alert = 'disconnectivityNotification';
	const updateInterval = 60000;

	function setBadgeBackgroundColor(color) {
		chrome.browserAction.setBadgeBackgroundColor({
			color: color
		});
	}

	function setBadgeText(text) {
		chrome.browserAction.setBadgeText({
			text: text
		});
	}

	function setBadgeTitle(title) {
		chrome.browserAction.setTitle({
			title: title
		});
	}

	function createActiveTabTo(url) {
		chrome.tabs.create({
			active: true,
			url: url
		});
	}

	function setupPriceFetchInterval() {
		window.setInterval(() => {
			updateBadge();
		}, updateInterval);
	}

	function updateBadgeAsInfoNotAvailable() {
		setBadgeBackgroundColor('red');
		setBadgeText('N/A');
	}

	function updateBadgeWith(mullvadInfo) {
		let badgeTitle = '';

		if (mullvadInfo.isConnected && mullvadInfo.city !== null) {
			badgeTitle = mullvadInfo.ip + ' | ' + mullvadInfo.city + ', ' + mullvadInfo.country + ' | ' + mullvadInfo.server + ' | ' + mullvadInfo.serverType;
			setBadgeText('✔');
			setBadgeBackgroundColor('green');
		} else {
			badgeTitle = 'Connectivity to Mullvad server lost';
			setBadgeText('✘');
			setBadgeBackgroundColor('red');

			chrome.notifications.create(alert, {
				type: 'basic',
				message: 'Please check your VPN connection',
				title: badgeTitle
			});
		}
		setBadgeTitle(badgeTitle);
	}

	function getInfoFrom(response) {
		response = JSON.parse(response);
		return {
			ip: response['ip'],
			country: response['country'],
			city: response['city'],
			isConnected: response['mullvad_exit_ip'],
			server: response['mullvad_exit_ip_hostname'],
			serverType: response['mullvad_server_type'],
		};
	}

	function makeRequestForConnectivityInfo() {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'https://am.i.mullvad.net/json', true);
			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(xhr.response);
				} else {
					reject({
						status: xhr.status,
						statusText: xhr.statusText
					});
				}
			};
			xhr.onerror = () => {
				reject({
					status: xhr.status,
					statusText: xhr.statusText
				});
			};
			xhr.send();
		});
	}

	function updateBadge() {
		makeRequestForConnectivityInfo().then((response) => {
			updateBadgeWith(getInfoFrom(response));
		})
		.catch(err => {
			console.error('Error:', err);
			updateBadgeAsInfoNotAvailable();
		});
	}

	function setupBadge() {
		setBadgeBackgroundColor('#F86922');
		setBadgeText('...');

		chrome.browserAction.onClicked.addListener((tab) => {
			createActiveTabTo('https://am.i.mullvad.net');
		});
	}

	setupBadge();
	updateBadge();
	setupPriceFetchInterval();
})();