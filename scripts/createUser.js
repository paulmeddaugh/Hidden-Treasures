function _(x) {
	return document.getElementById(x);
}

function check(EleId, corForm) {
	var varSlice;
	if (corForm && EleId.value.length < 27) {
		return false;
	} else {
		if (EleId.value.length != 0) {
			varSlice = EleId.value.slice(0,0);
			EleId.value = varSlice;
			EleId.focus();
			return true;
		}
	}
}
	
function chkEmail(alertError = true) {
	var email = document.getElementById("email");

	var corForm = /^[a-zA-Z0-9@.]*$/.test(email.value);
	var match = /[.]/.test(email.value);
	var match2 = /[@]/.test(email.value);

	if (check(email,corForm) == 1) {
		if (alertError) alert("Please enter a valid email.");
		return false;
	}
	if (check(email,match) == 1) {
		if (alertError) alert("Please include a '.' ");
		return false;
	}
	if (check(email,match2) == 1) {
		if (alertError) alert("Please include a '@' ");
		return false;
	}

	return true;
}

function chkName(alertError = true) {
	var name = document.getElementById("name");

	var corForm = /^[a-zA-Z ]*$/.test(name.value);

	if (check(name,corForm) == 1) {
		if (alertError) alert("Please enter a valid name.");
		return false;
	}
	
	return true;
}
function chkUSN(alertError = true) {
	var usn = document.getElementById("usn");

	var corForm = /^[a-zA-Z0-9@-_$]*$/.test(usn.value);

	if (check(usn,corForm) == 1) {
		if (alertError) alert("Please enter a valid username.");
	}

	return true;
}
function chkPassword(alertError = true) {
	var pwd = document.getElementById("pwd");

	var pwdS;
	if (pwd.value.length > 15) {
		if (alertError) alert("Password cannot be over 15 characters.");
		pwdS = pwd.value.slice(0,0);
		document.getElementById("pwd").value = pwdS;
		document.getElementById("pwd").focus();
		return false;
	} else if (pwd.value.length < 8 && pwd.value.length != 0) {
		if (alertError) alert("Password cannot be less than 8 characters.");
		pwdS = pwd.value.slice(0,0);
		document.getElementById("pwd").value = pwdS;
		document.getElementById("pwd").focus();
		return false;
	}

	return true;
}

function chkREpwd(alertError = true) {
	var repwd = document.getElementById("repwd");
	var pwd = document.getElementById("pwd");
	var repwdS;
	var pwdS;
	if (repwd.value != pwd.value && repwd.value.length != 0) {
		if (alertError) alert("Passwords do not match!");
		repwdS = repwd.value.slice(0,0);
		pwdS = pwd.value.slice(0,0);
		document.getElementById("repwd").value = repwdS;
		document.getElementById("pwd").value = pwdS;
		document.getElementById("pwd").focus();
		return false;
	}

	return true;
}
function chkRemind(alertError = true) {
	var rem = document.getElementById("reminder");

	var remS;
	if (rem.value.length > 45) {
		if (alertError) alert("Reminder cannot be over 45 characters");
		remS = rem.value.slice(0,0);
		document.getElementById("reminder").value = remS;
		document.getElementById("reminder").focus();
		return false;
	} 
	
	return true;
}
function chkBalance(alertError = true) {
	var balance = document.getElementById("balance");
	var corForm = /^[0-9]*$/.test(balance.value);

	if (checkEmpty(balance, false)) balance.value = 0;
	
	if (check(balance,corForm) == 1) {
		if (alertError) alert("Please enter only numbers.");
		var balS = balance.value.slice(0,0);
		document.getElementById("balance").value = balS;
		document.getElementById("balance").focus();
		return false;
	}
	
	if (balance.value < 1 || balance.value > 1001) {
		if (alertError) alert("Balance must be less than 1001 and greater than 0.");
		var balS = balance.value.slice(0,0);
		document.getElementById("balance").value = balS;
		document.getElementById("crtAcc").focus();
		return false;
	}
	
	return true;
}

function checkEmpty(x, alertError = true) {
	if (x.value == "") {
		if (alertError) alert("Input cannot be empty.");
		return true;
	}

	return false;
}

function chkEmpty() {
	var error = "", errorObject = null;
	
	var email = document.getElementById("email");
	var name = document.getElementById("name");
	var usn = document.getElementById("usn");
	var pwd = document.getElementById("pwd");
	var repwd = document.getElementById("repwd");
	var rem = document.getElementById("reminder");
	var bal = document.getElementById("balance");

	// Checks if any are empty
	if (checkEmpty(email, false) || checkEmpty(name, false) || checkEmpty(usn, false)
		|| checkEmpty(pwd, false) || checkEmpty(repwd, false) || checkEmpty(rem, false)
		|| checkEmpty(bal, false)) {
		
		alert("Inputs cannot be empty.");
		return false;
	}

	// Builds error message if error
	if (!chkEmail(false)) {
		error = "Please enter a valid email.\n";
		errorObject = email;
	}
	if (!chkName(false)) {
		error += "Please enter a valid name.\n";
		if (!errorObject) errorObject = name;
	}
	if (!chkUSN(false)) {
		error += "Please enter a valid username.\n";
		if (!errorObject) errorObject = usn;
	}
	if (!chkPassword(false)) {
		error += "Please enter a valid password.\n";
		if (!errorObject) errorObject = pwd;
	}
	if (!chkREpwd(false)) {
		error += "Please enter a valid re-password.\n";
		if (!errorObject) errorObject = repwd;
	}
	if (!chkRemind(false)) {
		error += "Please enter a valid reminder.\n";
		if (!errorObject) errorObject = rem;
	}
	if (!chkBalance(false)) {
		error += "Please enter a valid balance.\n";
		if (!errorObject) errorObject = bal;
	}

	if (error) { // Invalid
		alert(error);
		errorObject.focus();
		return false;

	} else { // Valid
		var params;
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "../php/createUser.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				alert(result);
				console.log(result);
				if (result.match(/User created!/g)) {
					window.open('../index.html', '_self');
				}
			
			}
		}
		params = "email="+email.value+"&name="+name.value+"&usn="+usn.value+"&pwd="+pwd.value+"&rem="+rem.value+"&bal="+bal.value;
		xhr.send(params);
	}
	
	return false;
}