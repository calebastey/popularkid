var addressMap = {
    AL: [33.516477, -86.801318],
    CA: [37.760093, -122.445554],
    FL: [28.537098, -81.374139],
    HI: [21.450891, -158.015506],
    ID: [43.615652, -116.382023],
    IL: [40.720637, -89.588852],
    IN: [39.769977, -86.158098],
    KS: [37.686880, -97.313677],
    LA: [30.459937, -91.138468],
    ME: [44.800996, -68.775865],
    MN: [45.553738, -94.202043],
    MS: [32.308360, -90.195949],
    MO: [38.577342, -92.181853],
    NM: [35.109296, -106.587914],
    OH: [39.983008, -83.007009],
    OK: [35.555878, -97.524654],
    OR: [44.045282, -123.099215],
    SC: [34.002269, -81.038380],
    TN: [36.170924, -86.785468],
    TX: [32.839374, -96.795799],
    UT: [40.592341, -111.919458],
    WA: [47.667867, -117.413954],
    WI: [43.047923, -88.114132],
    WY: [42.844779, -106.311006]
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

    // setup some context/configuration prior to population
    var populateContext = {
      approve: document.getElementById('approveOrDecline_approve').checked,
    };

    chrome.tabs.executeScript({
      code:'var populateContext = ' + JSON.stringify(populateContext) + ';'

    });

    chrome.tabs.executeScript({
      file:'populate.js'
    });

  }, false);

}, false);

document.getElementById("validAddress").addEventListener("click", function() {
    generateValidAddress("CA").done(function(address) {
        document.getElementById("validAddressView").innerHTML = address;
        console.log(address);
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
        var address = {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zip: ""
        }
        var streetNumber = "";
        var route = "";

        if (data.status == "OK") {
            var components = data.results[0].address_components;
            for (var i = 0; i < components.length; i++) {
                if (components[i].types.includes('street_number')) {
                    streetNumber = components[i].short_name;
                }
                else if (components[i].types.includes('route')) {
                    route = components[i].short_name;
                }
                else if (components[i].types.includes('locality')) {
                    address.city = components[i].long_name;
                }
                else if (components[i].types.includes('administrative_area_level_1')) {
                    address.state = components[i].short_name;
                }
                else if (components[i].types.includes('postal_code')) {
                    address.zip = components[i].short_name;
                }
            }
            address.addressLine1 = streetNumber + " " + route;
            deferred.resolve(address);
        } else {
            console.log("Unable to get address results: Error is " + data.status)
        }

    });

    return deferred.promise();
}

