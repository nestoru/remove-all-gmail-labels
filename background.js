//
// function definitions
//
function wait(ms) { 
  var start = new Date().getTime();
  while (new Date() < start + ms) {}
}  

function badge(text) {
  chrome.browserAction.setBadgeText({'text':text});
}

function isLabelSettingsPage(tab) {
  var url = tab.url;
  var regex = "https://mail.google.com.*settings.*labels";
  return (new RegExp(regex)).test(url);
}

function handler(tab) {
  badge("running");
  if(isLabelSettingsPage(tab)) {
    var r = confirm("You are about to delete all labels automatically. If you choose to continue do not interact with this tab until it is done. YOU CANNOT UNDO THIS OPERATION!!! Press OK if you agree to remove all labels?");
    if (r == true) {
      chrome.tabs.executeScript(tab.id, {file: "content.js"});
    }
  } else {
    alert('Go to "Gmail |  Settings | Labels" to run this extension.');
  }
  badge("done");
  wait(1000);
  badge("");
}


chrome.browserAction.onClicked.addListener(handler);
