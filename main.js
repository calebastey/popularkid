// setup listeners (and other things?) once the plugin DOM is loaded
document.addEventListener('DOMContentLoaded', function() {

  // these are the shortcut links displayed in the extension
  var shortcuts = [
    {id:'localLink', url:'http://localhost:9999/short-term-loans', incognito:false},
    {id:'incognitoLocalLink', url:'http://localhost:9999/short-term-loans', incognito:true},
    {id:'stagingLink', url:'https://staging.lendup.com/short-term-loans', incognito:false},
    {id:'incognitoStagingLink', url:'https://staging.lendup.com/short-term-loans', incognito:true},
  ];

  // setup listeners for all shortcuts
  for (shortcut of shortcuts) {
    var link = document.getElementById(shortcut.id);
    link.addEventListener('click', shortcutClick(shortcut), false);
  }

  // setup listener for the "populate" button
  var populate = document.getElementById('populate');
  populate.addEventListener('click', function() {

    // setup some context/configuration prior to population
    var populateContext = {
      approve: document.getElementById('approveOrDecline_approve').checked,
      usState: document.getElementById('popState').value,
    };

    chrome.tabs.executeScript({
      code:'var populateContext = ' + JSON.stringify(populateContext) + ';'

    });

    chrome.tabs.executeScript({
      file:'populate.js'
    });

  }, false);

}, false);

// return callback for shortcut click
function shortcutClick(shortcut) {
  return function(){
    if (shortcut.incognito) {
      chrome.windows.create({'url': shortcut.url, 'incognito': true});
    } else {
      chrome.tabs.update({url: shortcut.url});
    }
  };
};



