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
    console.log(shortcut);
    var link = document.getElementById(shortcut.id);
    link.addEventListener('click', shortcutClick(shortcut), false);
  }

  // setup listener for the "populate" button
  var populate = document.getElementById('populate');
  populate.addEventListener('click', function() {
    console.log('populating form...');

    chrome.tabs.executeScript({
      file:'populate.js'
    });

    console.log('...done populating!');
  }, false);

}, false);

document.getElementById("generateNumber").addEventListener("click", function() {
    document.getElementById("randomPhone").innerHTML = generateValidPhoneNumber();
});

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

// https://en.wikipedia.org/wiki/North_American_Numbering_Plan#Modern_plan
function generateValidPhoneNumber() {
    var np1;
    var np2;
    var nxx;

    do {
        np1 = randomInteger(0,9);
        np2 = randomInteger(0,9);
    } while (np1 === np2);

    do {
        nxx = randomInteger(200, 999);
    } while (((nxx - 11) % 100) == 0 && nxx != 555);  // can't be 911, 411, 611, etc. or 555

    return randomInteger(2,9) + np1.toString() + np2.toString() + "-" + nxx + "-" +
           randomInteger(0,9).toString() + randomInteger(0,9).toString() + randomInteger(0,9).toString() +
           randomInteger(0,9).toString();
}

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

function randomInteger(lo, hi) {
    return Math.floor(lo + (Math.random() * ((hi - lo) + 1)))
};