console.log('populating form...');

console.log('populateContext.approve: ' + populateContext.approve);

// some inputs are interdependent, prepare values for those fields here
var password = '1234qwer';
var lastname;
if (populateContext.approve) {
  lastname = 'Awesome';
} else {
  lastname = 'Asshole';
}

var inputFillers = [
  // TODO: generate random valid email address
  fillInput('user_email', 'cgottlieb1234@gmail.com'),
  fillInput('user_password', password),
  fillInput('user_password_verify', password),
  checkboxFiller('certify', true),

  fillInput('info_firstName', 'Sam'),
  fillInput('info_lastName', lastname),
  // TODO: generate SSN?
  fillInput('info_ssn', '123456789'),
  fillInput('info_mobilePhone', utils.generateValidPhoneNumber()),

  selectFiller('birthDate-month', '02'),
  selectFiller('birthDate-day', '03'),
  selectFiller('birthDate-year', '1977'),


  fillInput('info_address_street1', ''),
  fillInput('info_address_city', ''),
  fillInput('info_address_state', ''),
  fillInput('info_address_zip', '94901'),

  selectFiller('residenceType', 'RENT'),
  fillInput('monthlyResidencePayment', '1500'),
  fillInput('averageMonthlyExpenses', '500'),

  selectFiller('loanPurpose', 'AUTO_EXPENSE'),

];

for (inputFiller of inputFillers) {
  inputFiller();
}

console.log('...done populating!');

// input filler functions, always require input id and value
//////////////////////////////////////

// return function that will fill the specified input
function fillInput(id, value) {
  return function(){
    var input = document.getElementById(id);
    if (input) {
      input.value = value;
    } else {
      console.log('no input found for id: ' + id);
    }
  };
};

// return function that will check/uncheck the specified checkbox
function checkboxFiller(id, value) {
  return function(){
    var checkbox = document.getElementById(id);
    if(checkbox) {
      checkbox.checked = value;
    } else {
      console.log('no input found for id: ' + id);
    }
  };
};

// return function that will select the specified option
function selectFiller(id, value) {
  return function(){
    var select = document.getElementById(id);
    if(select) {
      var options = select.options;
        for(var option, j = 0; option = options[j]; j++) {
          if(option.value == value) {
            select.selectedIndex = j;
            break;
          }
        }
    } else {
      console.log('no input found for id: ' + id);
    }
  };
}
