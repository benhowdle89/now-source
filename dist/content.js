"use strict";

(function () {
  var _window$location = window.location,
      hostname = _window$location.hostname,
      protocol = _window$location.protocol;
  var url = "".concat(protocol, "//").concat(hostname);

  var addButton = function addButton(url) {
    document.body.innerHTML += "\n        <a id=\"now-source-viewer\" href=\"".concat(url, "\">View Now Source</a>\n    ");
  };

  var loadCSS = function loadCSS() {
    var path = chrome.runtime.getURL("styles/main.css");
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = path;
    document.head.appendChild(link);
  };

  var render = function render(url) {
    loadCSS();
    addButton(url);
  };

  fetch("".concat(url, "/_src"), {
    method: "HEAD"
  }).then(function (res) {
    if (res.ok && res.status === 200 && res.url.match(/zeit/)) {
      render(res.url);
    }
  }).catch();
})();