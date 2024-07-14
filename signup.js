var email = document.forms['form']['email'];
var password = document.forms['form']['password'];
var password1 = document.forms['form']['password1'];

var email_error = document.getElementById('email_error');
var pass_error = document.getElementById('pass_error');
var pass_error1 = document.getElementById('pass_error1');

email.addEventListener('textInput', email_Verify);
password.addEventListener('textInput', pass_Verify);
password1.addEventListener('textInput', pass_Verify1);

function validated(){
	if (email.value.length < 9) {
		email.style.border = "1px solid red";
		email_error.style.display = "block";
		email.focus();
		return false;
	}
	if (password.value.length < 6) {
		password.style.border = "1px solid red";
		pass_error.style.display = "block";
		password.focus();
		return false;
	}
    if(password!==password1){
        password.style.border = "1px solid red";
		pass_error.style.display = "block";
		password.focus();
		return false;
    }

}
function email_Verify(){
	if (email.value.length >= 8) {
		email.style.border = "1px solid silver";
		email_error.style.display = "none";
		return true;
	}
}
function pass_Verify(){
	if (password.value.length >= 5) {
		password.style.border = "1px solid silver";
		pass_error.style.display = "none";
		return true;
	}
}
function pass_Verify1(){
	if (password1===password) {
		password1.style.border = "1px solid silver";
		pass_error1.style.display = "none";
		return true;
	}
}