var user = sessionStorage.getItem("username");

function check(EleId, corForm){
	var varSlice;
	if (corForm && EleId.value.length < 27) {
		return 0;
	} else {
		if (EleId.value.length != 0) {
			varSlice = EleId.value.slice(0,0);
			EleId.value = varSlice;
			EleId.focus();
			EleId.select();
			return 1;
		}
	}	
}
	
function chkUSN(){
	var usn = document.getElementById("usn");
	var corForm = /^[a-zA-Z0-9@-_$]*$/.test(usn.value);
	if (check(usn,corForm) == 1){
		alert("Please enter a valid Username");
	}
}

function chkRemind(){
	var rem = document.getElementById("reminder");
	var remS;
	if (rem.value.length > 45) {
		alert("Password cannot be over 45 characters");
		remS = rem.value.slice(0,0);
		document.getElementById("reminder").value = remS;
		document.getElementById("reminder").focus();
	} 
}
function chkEmpty(){
	let error = "", errorObject;
	var usn = document.getElementById("usn");
	var rem = document.getElementById("reminder");
	
	if (usn.value == "") {
		error = "Username cannot be empty.";
		errorObject = usn;
	}
	if (rem.value == "") {
		error = (error == "") ? "Reminder cannot be empty." : "Both username and reminder are empty.";
		errorObject = rem;
	}
	
	if (error != "") { // Invalid
		alert(error);
		errorObject.focus();
		return false;

	} else { // Valid
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {

			let result = xhr.responseText, jsonData;
			try {
				jsonData = JSON.parse(result);
			} catch {
				alert(result);
				return false;
			}
			
			let rowCount = jsonData.length;
			
			if (rowCount > 0) {
				for (var i = 0; i < rowCount; i++) {
					var rowdata = jsonData[i];
					console.log(rowdata);
				}
				document.getElementById("pwdLoc").innerHTML = rowdata.password;
				console.log(result);
			} else {
				alert("No password associated with given username and reminder"); 
				window.open('remind.html', '_self');
			}
		}
		xhr.open("GET", "../php/remind.php?usn=" + usn.value + "&rem="+ rem.value);// 
		xhr.send();		
	}

	return false;
}