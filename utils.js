var randr = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

const addresses = {
    "default": {
        street1: '',
        street2: '',
        city: '',
        zip: ''
    },
    "AL": {
        street1: '600 Dexter Ave',
        street2: '',
        city: 'Montgomery',
        zip: '36130'
    },
    "CA": {
        street1: '123 Mission Street',
        street2: '',
        city: 'San Francisco',
        zip: '94105'
    },
    "FL": {
        street1: '400 S Monroe St',
        street2: '',
        city: 'Tallahassee',
        zip: '32399'
    },
    "HI": {
        street1: '415 S Beretania St.',
        street2: '',
        city: 'Honolulu',
        zip: '96813'
    },
    "ID": {
        street1: '700 W Jefferson St.',
        street2: '',
        city: 'Boise',
        zip: '83720'
    },
    "IL": {
        street1: '301 S 2nd Street',
        street2: '',
        city: 'Springfield',
        zip: '62706'
    },
    "IN": {
        street1: '200 W Washington St',
        street2: '',
        city: 'Indianapolis',
        zip: '46204'
    },
    "KS": {
        street1: '300 SW 10th St',
        street2: '',
        city: 'Topeka',
        zip: '66612'
    },
    "LA": {
        street1: '900 N 3rd St',
        street2: '',
        city: 'Baton Rouge',
        zip: '70802'
    },
    "ME": {
        street1: '230 State St',
        street2: '',
        city: 'Augusta',
        zip: '04330'
    },
    "MI": {
        street1: '1903 W Michigan Ave',
        street2: '',
        city: 'Kalamazoo',
        zip: '49008'
    },
    "MN": {
        street1: '475 Rev Dr Martin Luther King Jr Boulevard',
        street2: '',
        city: 'St Paul',
        zip: '55155'
    },
    "MS": {
        street1: '400 High St',
        street2: '',
        city: 'Jackson',
        zip: '39201'
    },
    "MO": {
        street1: '201 W Capitol Ave',
        street2: '',
        city: 'Jefferson City',
        zip: '65101'
    },
    "NM": {
        street1: '201 W. Marcy St',
        street2: '',
        city: 'Santa Fe',
        zip: '87501'
    },
    "OH": {
        street1: '281 W. Lane Ave',
        street2: '',
        city: 'Columbus',
        zip: '43210'
    },
    "OK": {
        street1: '2300 N Lincoln Blvd',
        street2: '',
        city: 'Oklahoma City',
        zip: '73105'
    },
    "OR": {
        street1: '900 Court St NE',
        street2: '',
        city: 'Salem',
        zip: '97301'
    },
    "TN": {
        street1: '600 Charlotte Ave',
        street2: '',
        city: 'Nashville',
        zip: '37243'
    },
    "TX": {
        street1: '1100 Congress Ave',
        street2: '',
        city: 'Austin',
        zip: '78701'
    },
    "UT": {
        street1: '350 State St',
        street2: '',
        city: 'Salt Lake City',
        zip: '84111'
    },
    "WA": {
        street1: '215 Sid Snyder Ave SW',
        street2: '',
        city: 'Olympia',
        zip: '98501'
    },
    "WI": {
        street1: '400 W Canal St',
        street2: '',
        city: 'Milwaukee',
        zip: '53203'
    },
    "WY": {
        street1: '200 W 24th St',
        street2: '',
        city: 'Cheyenne',
        zip: '82001'
    }
};

var utils = {
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
            np1 = this.randomInteger(0,9);
            np2 = this.randomInteger(0,9);
        } while (np1 === np2);

        do {
            nxx = this.randomInteger(200, 999);
        } while (((nxx - 11) % 100) == 0 && nxx != 555);  // can't be 911, 411, 611, etc. or 555

        return this.randomInteger(2,9) + np1.toString() + np2.toString() + "-" + nxx + "-" +
               this.randomInteger(0,9).toString() + this.randomInteger(0,9).toString() + this.randomInteger(0,9).toString() +
               this.randomInteger(0,9).toString();
    },
    randomInteger(lo, hi) {
        return Math.floor(lo + (Math.random() * ((hi - lo) + 1)))
    },
    generateValidAddress: function(state) {
        addresses['state'];
    }
};
