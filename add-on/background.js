(function() {
  "use strict";

  const alert = "disconnectivityNotification";
  const updateInterval = 60000; // ms

  const checkConnection = "Please check your VPN connection";
  const connectivityNA = "Connectivity could not be determined";
  const connectionLost = "Connectivity to Mullvad server lost";
  const amIMullvad = "https://am.i.mullvad.net";
  const amIMullvadJson = amIMullvad + "/json";

  const setBadgeBackgroundColorAs = color => {
    chrome.browserAction.setBadgeBackgroundColor({
      color: color
    });
  };

  const setBadgeTextAs = text => {
    chrome.browserAction.setBadgeText({
      text: text
    });
  };

  const setBadgeTitleAs = title => {
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

  const throwNotificationWithBadgeTitleAs = badgeTitle => {
    chrome.notifications.create(alert, {
      type: "basic",
      message: checkConnection,
      title: badgeTitle
    });
  };

  const updateBadgeAsConnectionInfoNotAvailable = () => {
    setBadgeBackgroundColorAs("red");
    setBadgeTextAs("N/A");
    setBadgeTitleAs(connectivityNA);
    throwNotificationWithBadgeTitleAs(connectivityNA);
  };

  const isConnectionThroughProxy = connectionType => {
    return connectionType.includes("SOCKS");
  };

  const updateBadgeWith = connectionInfo => {
    if (connectionInfo.isConnected) {
      setBadgeTextAs("✔");

      if (isConnectionThroughProxy(connectionInfo.type)) {
        setBadgeTextAs("✔✔");
      }
      setBadgeBackgroundColorAs("green");
      const badgeTitle =
        connectionInfo.ip +
        " | " +
        connectionInfo.city +
        connectionInfo.country +
        " | " +
        connectionInfo.server +
        " | " +
        connectionInfo.type;
      setBadgeTitleAs(badgeTitle);
    } else {
      setBadgeTextAs("✘");
      setBadgeBackgroundColorAs("red");
      throwNotificationWithBadgeTitleAs(connectionLost);
      setBadgeTitleAs(connectionLost);
    }
  };

  const getConnectionInfoFrom = response => {
    response = JSON.parse(response);
    return {
      ip: response["ip"],
      country: response["country"],
      city: response["city"] ? response["city"] + ", " : "",
      isConnected: response["mullvad_exit_ip"],
      server: response["mullvad_exit_ip_hostname"],
      type: response["mullvad_server_type"]
    };
  };

  const makeRequestForConnectionInfo = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", amIMullvadJson, true);
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
    makeRequestForConnectionInfo()
      .then(response => {
        updateBadgeWith(getConnectionInfoFrom(response));
      })
      .catch(() => {
        updateBadgeAsConnectionInfoNotAvailable();
      });
  };

  const setupBadge = () => {
    setBadgeBackgroundColorAs("#F86922");
    setBadgeTextAs("...");
    setBadgeTitleAs(connectivityNA);

    chrome.browserAction.onClicked.addListener(() => {
      createActiveTabTo(amIMullvad);
    });
  };

  setupBadge();
  updateBadge();
  setupConnectivityCheckInterval();
})();
