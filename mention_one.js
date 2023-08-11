var types = { one: 1, one_rst: 0, all: 3, all_stop: 2, err: -1 };

var chatWindow = document.getElementsByClassName("_5kRIK")[0];

function addListeners() {
    try {
        var msges = chatWindow.getElementsByClassName("message-in");

        for (var i = 0; i < msges.length; i++) {
            var msg = msges[i];

            var senderBox = msg.querySelector("._3FuDI");
            if (senderBox) {
                senderBox.onmouseenter = function () {
                    const member = this.textContent.split(' ')[0];
                    console.log(member);
                    chrome.runtime.sendMessage({ type: types.one, m: member });
                }
            }

            senderBox = msg.querySelector("._2ne0X");
            if (senderBox) {
                senderBox.onmouseenter = function () {
                    const member = this.textContent.split(' ')[0];
                    chrome.runtime.sendMessage({ type: types.one, m: member });
                }
            }

        }

    } catch (e) {
        // chrome.runtime.sendMessage({ type: types.err, m: e.toString() });
        console.log("ERROR: " + e.toString());
    }
    console.log('Listeners added');

}

// chatWindow.addEventListener('DOMSubtreeModified', addListeners, false);

var observer = new MutationObserver(addListeners);
observer.observe(chatWindow, { childList: true, subtree: true });
addListeners();

var input = document.querySelectorAll('div[contenteditable="true"]')[1];
input.focus();
// window.getSelection().collapse(input.lastChild, input.innerText.length);

console.log("Start mention one");
chrome.runtime.sendMessage({ type: types.one_rst });