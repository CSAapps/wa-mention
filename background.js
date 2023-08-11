var types = { one: 1, one_rst: 0, all: 3, all_stop: 2, err: -1 };
var mention = {}
var group = {}
var mentionedSet = new Set();
var canSend = true;

function send(data) {
    if (canSend) {
        canSend = false;
        mentionedSet.add(data);
        chrome.runtime.sendNativeMessage(
            "csa.apps.wa.mention", { m: '@' + data },
            function (response) {
                canSend = true;
                console.log(response);
            });
    } else {
        console.log("Wait");
    }
}

function sendAll() {
    if (group.i < group.m.length) {
        if (group.m[group.i] != "You") {
            chrome.runtime.sendNativeMessage(
                "csa.apps.wa.mention", { m: '@' + group.m[group.i++] },
                function (response) {
                    console.log(response);
                    sendAll();
                });
        } else {
            group.i++;
            sendAll();
        }
    } else canSend = true;
}

mention[types.one] = function (m) {
    if (!mentionedSet.has(m)) {
        send(m);
        console.log("mention one" + m);
    }
}

mention[types.one_rst] = function (m) {
    mentionedSet.clear();
    console.log("mention one rst");
}

mention[types.all] = function (m) {
    console.log("mention all");
    group.i = 0;
    group.m = m.split(', ');
    canSend = false;
    sendAll();
}

mention[types.all_stop] = function (m) {
    console.log("mention all stop");
    group.i = group.m.length;
}

mention[types.err] = function (m) {
    console.log("ERROR:");
    console.log(m);
}


chrome.runtime.onMessage.addListener(function (data) {
    console.log('PAGE: ');
    console.log(data);
    mention[data.type](data.m);
});