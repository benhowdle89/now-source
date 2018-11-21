(function() {
  const { hostname, protocol } = window.location;
  const url = `${protocol}//${hostname}`;

  const addButton = url => {
    document.body.innerHTML += `
        <a id="now-source-viewer" href="${url}">View Now Source</a>
    `;
  };

  const loadCSS = () => {
    const path = chrome.runtime.getURL("styles/main.css");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = path;
    document.head.appendChild(link);
  };

  const render = url => {
    loadCSS();
    addButton(url);
  };

  fetch(`${url}/_src`, {
    method: "HEAD"
  })
    .then(res => {
      if (res.ok && res.status === 200 && res.url.match(/zeit/)) {
        render(res.url);
      }
    })
    .catch();
})();
