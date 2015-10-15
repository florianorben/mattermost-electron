(function () {
    var webview = document.querySelector('webview'),
        ipc = require('ipc'),
        offset = 0;

    function escapeRegex(val) {
        return val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }

    function showWebView(newUrl) {
        document.getElementById('findTeamForm').style.display = 'none';
        webview.style.display = 'block'
        webview.src = newUrl;
    }

    webview.style.height = (window.outerHeight - offset) + 'px';
    ipc.on('resize', function(message) {
        webview.style.height = (window.outerHeight - offset) + 'px';
    });

    if (localStorage.getItem('team')) {
        showWebView('http://localhost:8065/' + localStorage.getItem('team'));
    }

    document.getElementById('findTeamForm').addEventListener('submit', function (e) {
        var team = document.getElementById('findTeam').value.trim(),
            newUrl,
            interval;

        e.preventDefault();

        if (team) {
            newUrl = 'http://localhost:8065/' + team;
            showWebView(newUrl);
        }

        interval = setInterval(function () {
            var reg = new RegExp('^' + escapeRegex(newUrl) + '\/channels'),
                webviewUrl = webview.getUrl();

            if (reg.test(webviewUrl)) {
                clearInterval(interval);
                localStorage.setItem('team', team);
            }
        }, 150);
    }, false);
})();
