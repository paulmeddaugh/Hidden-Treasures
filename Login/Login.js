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
						console.log(rowdata);
					}
					console.log(username.value + " " + rowdata.username + " " + password.value +
					" " + rowdata.password);

					if (username.value.toLowerCase() == rowdata.username.toLowerCase() &&
						 password.value == rowdata.password) {
						sessionStorage.setItem("uid", rowdata.uid);	
						sessionStorage.setItem('username', rowdata.username);
						sessionStorage.setItem('nameu', rowdata.nameu);
						sessionStorage.setItem('balance', rowdata.balance);
						console.log("1");
						//alert(rowdata.username);
						window.open("../Exchange/exchange.html", '_self');
					} else {
						alert("Invalid username/password."); 
				  	}
				    console.log(result);
				  }
			  }
			}
			xhr.open("GET", "Login.php?username=" + username.value + "&password="+ password.value);// 
			xhr.send();
		
		//SubmitData(event);
		//waits 2 seconds to allow user to see data in console.log
		//setTimeout(function () {window.open("exchange.html", '_self')}, 3000);
	
	}
	//user = sessionStorage.getItem("username");
		//alert("user =" + user);
}

function SubmitData (event) {
	var username = document.getElementById("Username");
	var password = document.getElementById("Password");
	
	console.log("Username: " + username.value + "\n" +
		"Password: " + password.value + "\n\nWaiting 3 seconds...");
	event.preventDefault();
}

function mouseEnterMain() {
	// document.getElementsByTagName("body")[0].style.setProperty('--background-body', 
	// 	'rgba(255, 255, 255, .0)');
	// document.getElementsByTagName("body")[0].style.setProperty('--background-body', 
	// 	['linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), ',
	// 	'linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), ',
	// 	'linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)'].join(''));
	//document.getElementsByTagName("main")[0].style.setProperty('--background-main', 'rgb(0, 0, 0, .12)');
	for (let s of ['top', 'left', 'bottom', 'right']) {
		document.getElementById(s).style.visibility = 'hidden';
	}
}

function mouseLeaveMain() {
	// document.getElementsByTagName("body")[0].style.setProperty('--background-body', 
	// 	'rgba(255, 255, 255, .0)');
	// document.getElementsByTagName("body")[0].style.setProperty('--background-body', 
	// 	'white');
	// document.getElementsByTagName("main")[0].style.setProperty('--background-main',
	// 	['linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), ',
	// 	'linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%), ',
	// 	'linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)'].join(''));
	for (let s of ['top', 'left', 'bottom', 'right']) {
		document.getElementById(s).style.visibility = 'visible';
	}
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
		'rgba(255, 255, 255, .3)');
}
function mouseLeaveSubmit () {
	document.getElementsByTagName("body")[0].style.setProperty('--background-body', 
		'rgba(255, 255, 255, .1)');
}