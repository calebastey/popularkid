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
};

var util = {
    withDefaults: function(defaults, overrides) {
        var out = {};

        defaults = defaults || {};
        overrides = overrides || {};

        Object.keys(defaults).forEach((key) => out[key]  = defaults[key]);
        Object.keys(overrides).forEach((key) => out[key] = overrides[key]);

        return out;
    },

    newEmail: function(suffix) {
        var suffix = suffix || '@lendup.com';
        return `selenium.test.${Math.random()}${suffix}`;
    },

    newSSN: function() {
        return `${randr(100, 999)}-55-${randr(1000, 9999)}`;
    },

    newPassword: function() {
        return 'test0000';
    },

    newPhone: function(areaCode) {
        return `650-3${randr(10, 99)}-${randr(1000,9999)}`;
    },

    newNextPayDate: function() {
        var numDays = Math.min(moment().utcOffset(-8).get('day') + 2, 5);
        return moment().add(numDays, 'days').format('MM/DD/YYYY');
    },

    newAccountNumber: function() {
        return randr(100000, 9999999999999999);
    },

    newCampaign: function() {
        return 'TV ' + randr(10, 999);
    },

    newPromoCode: function() {
        return 'TV' + randr(10, 999999);
    },

    validAddress: function(state) {
     if (state in addresses) {
         return addresses[state];
     }
     return addresses['default']
    },

    generateValidPhoneNumber: function() {
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
    },
    randomInteger(lo, hi) {
        return Math.floor(lo + (Math.random() * ((hi - lo) + 1)))
    },
    generateValidAddress: function(state) {
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
};
