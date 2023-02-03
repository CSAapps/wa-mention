var types = { one: 1, one_rst: 0, all: 3, all_stop: 2, err: -1 };

var groupTitle = document.getElementsByClassName("p357zi0d r15c9g6i g4oj0cdv ovllcyds l0vqccxk pm5hny62")[0];

var input = document.querySelectorAll('div[contenteditable="true"]')[1];
input.focus();

if (groupTitle && groupTitle.innerText)
    chrome.runtime.sendMessage({ type: types.all, m: groupTitle.innerText });
else
    alert("Unable to get members")