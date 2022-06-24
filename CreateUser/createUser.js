function _(x) {
return document.getElementById(x);
}

function check(EleId, corForm){
		var varSlice;
		if(corForm && EleId.value.length < 27){
			return 0;
		}
	else{
		if(EleId.value.length != 0){
			varSlice = EleId.value.slice(0,0);
			EleId.value = varSlice;
			EleId.focus();
			EleId.select();
			return 1;
		}
	}	
	}
	
	function chkEmail(){
		var email = document.getElementById("email");
		var corForm = /^[a-zA-Z0-9@.]*$/.test(email.value);
		var match = /[.]/.test(email.value);
		var match2 = /[@]/.test(email.value);
		if (check(email,corForm) == 1){
			alert("Please enter a valid Email");
		}
		if(check(email,match) == 1){
			alert("Please include a '.' ");
		}
		if(check(email,match2) == 1){
			alert("Please include a '@' ");
		}
		console.log("Email: " + email.value);
	}
	
	function chkName(){
		var name = document.getElementById("name");
		var corForm = /^[a-zA-Z ]*$/.test(name.value);
		if (check(name,corForm) == 1){
			alert("Please enter a valid Name");
		}
		console.log("Name: " + name.value);
	}
	function chkUSN(){
		var usn = document.getElementById("usn");
		var corForm = /^[a-zA-Z0-9@-_$]*$/.test(usn.value);
		if (check(usn,corForm) == 1){
			alert("Please enter a valid Username");
		}
		console.log("Username: " + usn.value);
	}
	function chkPassword(){
		var pwd = document.getElementById("pwd");
		var pwdS;
		if(pwd.value.length > 15){
			alert("Password cannot be over 15 characters");
			pwdS = pwd.value.slice(0,0);
			document.getElementById("pwd").value = pwdS;
			document.getElementById("pwd").focus();
			document.getElementById("pwd").select();
		} else if(pwd.value.length < 8 && pwd.value.length != 0){
			alert("Password cannot be less than 8 characters");
			pwdS = pwd.value.slice(0,0);
			document.getElementById("pwd").value = pwdS;
			document.getElementById("pwd").focus();
			document.getElementById("pwd").select();
		}
		console.log("Password: " + pwd.value);
	}
	
	function chkREpwd(){
		var repwd = document.getElementById("repwd");
		var pwd = document.getElementById("pwd");
		var repwdS;
		var pwdS;
		if(repwd.value != pwd.value && repwd.value.length != 0){
			alert("Passwords do not match!");
			repwdS = repwd.value.slice(0,0);
			pwdS = pwd.value.slice(0,0);
			document.getElementById("repwd").value = repwdS;
			document.getElementById("pwd").value = pwdS;
			document.getElementById("pwd").focus();
			document.getElementById("pwd").select();
		}
		console.log("rePassword: " + repwd.value);
	}
	function chkRemind(){
		var rem = document.getElementById("reminder");
		var remS;
		if(rem.value.length > 45){
			alert("Reminder cannot be over 45 characters");
			remS = rem.value.slice(0,0);
			document.getElementById("reminder").value = remS;
			document.getElementById("reminder").focus();
			document.getElementById("reminder").select();
		} 
		console.log("Reminder: " + rem.value);
	}
	function chkBalance(){
		var balance = document.getElementById("balance");
		var corForm = /^[0-9]*$/.test(balance.value);
		
		if (check(balance,corForm) == 1){
			alert("Please enter only numbers");
			var balS = balance.value.slice(0,0);
			document.getElementById("balance").value = balS;
			document.getElementById("balance").focus();
			document.getElementById("balance").select();
		}
		
		if(balance.value < 1 || balance.value > 1001){
			alert("Balance must be less than 1001 and greater than 0");
			var balS = balance.value.slice(0,0);
			document.getElementById("balance").value = balS;
			document.getElementById("crtAcc").focus();
			document.getElementById("crtAcc").select();
		}
		console.log("Balance: " + balance.value);
	}
	
	function isEmpty(x){
		if(x.value == ""){
			alert("Box(s) is empty cannot proceed");
		}
	}
	
	function chkEmpty(){
		var tf = true;
		
		var email = document.getElementById("email");
		var name = document.getElementById("name");
		var usn = document.getElementById("usn");
		var pwd = document.getElementById("pwd");
		var repwd = document.getElementById("repwd");
		var rem = document.getElementById("reminder");
		var bal = document.getElementById("balance");
		var corForm = /^[0-9]*$/.test(balance.value);
		
		if(email.value == "" && tf != false){
			tf = false;
			alert("Box(s) is empty cannot proceed");
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}else if(name.value == "" && tf != false){
			tf = false;
			alert("Box(s) is empty cannot proceed");
			document.getElementById("name").focus();
			document.getElementById("name").select();
		}else if (usn.value == "" && tf != false){
			tf = false;
			alert("Box(s) is empty cannot proceed");
			document.getElementById("usn").focus();
			document.getElementById("usn").select();
		}else if(pwd.value =="" && tf != false){
			tf = false;
			alert("Box(s) is empty cannot proceed");
			document.getElementById("pwd").focus();
			document.getElementById("pwd").select();
		}else if (repwd.value == "" && tf != false){
			alert("Box(s) is empty cannot proceed");
			tf = false;
			document.getElementById("repwd").focus();
			document.getElementById("repwd").select();
		}
		else if(rem.value == "" && tf != false){
			alert("Box(s) is empty cannot proceed");
			tf = false;
			document.getElementById("reminder").focus();
			document.getElementById("reminder").select();
		}else if(bal.value == "" && tf != false){
			alert("Box(s) is empty cannot proceed");
			tf = false;
			document.getElementById("balance").focus();
			document.getElementById("balance").select();
		}else if (check(balance,corForm) == 1){
			alert("Please enter only numbers");
			var balS = balance.value.slice(0,0);
			document.getElementById("balance").value = balS;
			document.getElementById("balance").focus();
			document.getElementById("balance").select();
		}else if(balance.value < 1 || balance.value > 1001){
			alert("Balance must be less than 1001 and greater than 0");
			var balS = balance.value.slice(0,0);
			document.getElementById("balance").value = balS;
			document.getElementById("crtAcc").focus();
			document.getElementById("crtAcc").select();
		}else{
			var params;
			
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "createUser.php", true);
			
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			
			 xhr.onreadystatechange = function () {
			 if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				alert(result);
				console.log(result);
				if(result.match(/User created!/g)){
					window.open('../Login/Login.html', '_self');
				}
				
				}
			}
			 params = "email="+email.value+"&name="+name.value+"&usn="+usn.value+"&pwd="+pwd.value+"&rem="+rem.value+"&bal="+bal.value;
			 xhr.send(params);
		}
	    
		return tf;
		
	}