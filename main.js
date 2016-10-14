var addressMap = {
    CA: [37.760093, -122.445554],
    TX: [0, 0]
}

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
    chrome.tabs.executeScript({
      file:'populate.js'
    });
  }, false);

}, false);

document.getElementById("validAddress").addEventListener("click", function() {
    generateValidAddress("CA").done(function(formattedAddress) {
        document.getElementById("validAddressView").innerHTML = formattedAddress;
    })
});

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

function generateValidAddress(state) {
    var latlon = addressMap[state];
    latlon[0] += (Math.random() / 10 - 0.05);
    latlon[1] += (Math.random() / 10 - 0.05);
    var deferred = $.Deferred();

    $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlon[0] + "," + latlon[1], function(data) {
        var formattedAddress = data.results[0].formatted_address;
        deferred.resolve(formattedAddress);
    });

    return deferred.promise();
}

