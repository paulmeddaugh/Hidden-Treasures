var user;

function chkIfAllFieldsEntered(event) {
	var username = document.getElementById("Username");
	var password = document.getElementById("Password");
	
	if (username.value == "" || password.value == "") {
		if (username.value == "" && password.value == "") {
			alert("Please enter both your username and password.");
		} else if (username.value != "" && password.value == "") {
			alert("Please enter your password.");
			password.focus();
			password.select();
		} else if (username.value == "" && password.value != "") {
			alert("Please enter your username.");
			username.focus();
			username.select();
		}
	} else {
		//database query
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
			var result = xhr.responseText;
			var jsonData = JSON.parse(result);
			
			var rowCount = jsonData.length;
			
				if (rowCount > 0) {
					for (var i = 0; i < rowCount; i++) {
						var rowdata = jsonData[i];
					}

					if (username.value.toLowerCase() == rowdata.username.toLowerCase() &&
							password.value == rowdata.password) {
						sessionStorage.setItem("uid", rowdata.uid);	
						sessionStorage.setItem('username', rowdata.username);
						sessionStorage.setItem('nameu', rowdata.nameu);
						sessionStorage.setItem('balance', rowdata.balance);
						window.open("./pages/exchange.html", '_self');
					} else {
						alert("Invalid username/password."); 
						return false;
					}
				}
			}
		}
		xhr.open("GET", "./php/Login.php?username=" + username.value + "&password="+ password.value);// 
		xhr.send();
	}
}

function mouseEnterMain() {
	for (let s of ['top', 'left', 'bottom', 'right']) {
		document.getElementById(s).style.visibility = 'hidden';
	}
	document.getElementsByTagName('main')[0].style.border = '2px solid transparent';
}

function mouseLeaveMain() {
	for (let s of ['top', 'left', 'bottom', 'right']) {
		document.getElementById(s).style.visibility = 'visible';
	}
	
	document.getElementsByTagName('main')[0].style.border = '2px solid black';
}

function mouseEnterInput () {
	mouseLeaveMain();
	document.getElementsByTagName("body")[0].style.gridTemplateColumns = 'auto 100% auto';
}
function mouseLeaveInput () {
	mouseEnterMain();
	document.getElementsByTagName("body")[0].style.gridTemplateColumns = 'auto 300px auto';
}

function mouseEnterSubmit () {
	document.getElementsByTagName("body")[0].style.setProperty('--background-body', 
		'rgba(255, 255, 255, .2)');
}
function mouseLeaveSubmit () {
	document.getElementsByTagName("body")[0].style.setProperty('--background-body', 
		'rgba(255, 255, 255, .1)');
}