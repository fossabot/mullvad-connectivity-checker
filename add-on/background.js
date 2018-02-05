(function() {
	'use strict';

	const alert = 'disconnectivityNotification';
	const updateInterval = 60000; // ms

	const checkConnection = 'Please check your VPN connection';
	const connectivityNA = 'Connectivity could not be determined';
	const connectionLost = 'Connectivity to Mullvad server lost';
	const amIMullvad = 'https://am.i.mullvad.net';
	const amIMullvadJson = amIMullvad + '/json';

	const setBadgeBackgroundColor = color => {
		chrome.browserAction.setBadgeBackgroundColor({
			color: color
		});
	};

	const setBadgeText = text => {
		chrome.browserAction.setBadgeText({
			text: text
		});
	};

	const setBadgeTitle = title => {
		chrome.browserAction.setTitle({
			title: title
		});
	};

	const createActiveTabTo = url => {
		chrome.tabs.create({
			active: true,
			url: url
		});
	};

	const setupConnectivityCheckInterval = () => {
		window.setInterval(() => {
			updateBadge();
		}, updateInterval);
	};

	const throwNotification = badgeTitle => {
		chrome.notifications.create(alert, {
			type: 'basic',
			message: checkConnection,
			title: badgeTitle
		});
	};

	const updateBadgeAsInfoNotAvailable = () => {
		setBadgeBackgroundColor('red');
		setBadgeText('N/A');
		setBadgeTitle(connectivityNA);
		throwNotification(connectivityNA);
	};

	const updateBadgeWith = mullvadInfo => {
		if (mullvadInfo.isConnected) {
			setBadgeText('✔');
			setBadgeBackgroundColor('green');
			const badgeTitle = mullvadInfo.ip + ' | ' + mullvadInfo.city + mullvadInfo.country + ' | ' + mullvadInfo.server + ' | ' + mullvadInfo.serverType;
			setBadgeTitle(badgeTitle);
		} else {
			setBadgeText('✘');
			setBadgeBackgroundColor('red');
			throwNotification(connectionLost);
			setBadgeTitle(connectionLost);
		}
	};

	const getInfoFrom = response => {
		response = JSON.parse(response);
		return {
			ip: response['ip'],
			country: response['country'],
			city: response['city'] ? response['city'] + ', ' : '',
			isConnected: response['mullvad_exit_ip'],
			server: response['mullvad_exit_ip_hostname'],
			serverType: response['mullvad_server_type'],
		};
	};

	const makeRequestForConnectivityInfo = () => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', amIMullvadJson, true);
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
	};

	const updateBadge = () => {
		makeRequestForConnectivityInfo().then((response) => {
			updateBadgeWith(getInfoFrom(response));
		})
		.catch(err => {
			updateBadgeAsInfoNotAvailable();
		});
	};

	const setupBadge = () => {
		setBadgeBackgroundColor('#F86922');
		setBadgeText('...');
		setBadgeTitle(connectivityNA);

		chrome.browserAction.onClicked.addListener((tab) => {
			createActiveTabTo(amIMullvad);
		});
	};

	setupBadge();
	updateBadge();
	setupConnectivityCheckInterval();
})();