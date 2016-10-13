console.log('test...');

// look for form elements that we know how to populate
var userEmail = document.getElementById('user_email');
userEmail.value = 'cgottlieb123@gmail.com';

var userPassword = document.getElementById('user_password');
userPassword.value = '1234qwer';

var userPasswordVerify = document.getElementById('user_password_verify');
userPasswordVerify.value = userPassword.value;

var certify = document.getElementById('certify');
certify.checked = true;

console.log('...test');
