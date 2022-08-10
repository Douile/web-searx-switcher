const a = document.getElementById('redirect');
browser.runtime.sendMessage('instance').then((response) => {
  if (a instanceof HTMLAnchorElement) {
    a.href = response + location.search;
    a.click();
  }
}).catch(alert);
