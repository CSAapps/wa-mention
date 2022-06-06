var types = { one: 1, one_rst: 0, all: 3, all_stop: 2, err: -1 };

function elmnt(id) {
    return document.getElementById(id);
}

async function runScript(script) {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [script]
    }, function () {
        //chrome.runtime.lastError;  
    });
}

function mention_one() {
    window.close();
    runScript("mention_one.js");
}

function mention_all() {
    window.close();
    runScript("mention_all.js");
}

function mention_all_stop() {
    chrome.runtime.sendMessage({ type: types.all_stop });
}

elmnt('btnOne').onclick = mention_one;
elmnt('btnAll').onclick = mention_all;
elmnt('btnStop').onclick = mention_all_stop;

// chrome.runtime.onMessage.addListener(function(data) {
//     var txtBox = document.getElementById('mainDiv');
//     if (data)
//         txtBox.innerText = data;
//     else
//         txtBox.innerText = "Started";
// });