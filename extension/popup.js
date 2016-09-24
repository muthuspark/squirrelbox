//     Copyright (c) 2016-2017 Muthukrishnan muthu.com
//     MIT License - http://opensource.org/licenses/mit-license.php
function getword(info, tab) {
    var payload = {
        'title': tab.title,
        'url': info.pageUrl,
        'text': info.selectionText,
        'userid': ''
    }
    chrome.storage.sync.get('edgaruserid', function(data) {
        if (data.edgaruserid) {
            payload.userid = data.edgaruserid;
        }
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8070/data", true);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var resp = JSON.parse(this.responseText);
                if (!data.edgaruserid) {
                    chrome.storage.sync.set({ 'edgaruserid': resp.userid }, function() {
                        //user created successfully!
                    });
                }
            }
        };
        xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhttp.send(JSON.stringify(payload));
    });

}

chrome.contextMenus.create({
    title: "Save selection to Squirrel Box",
    contexts: ["selection"],
    onclick: getword,
});

chrome.browserAction.onClicked.addListener(function() {
    chrome.storage.sync.get('edgaruserid', function(data) {
        if (data.edgaruserid) {
            window.open('http://localhost/squirrelbox/#/'+data.edgaruserid)
        }
    })
});
