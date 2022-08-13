var user;

function chkIfAllFieldsEntered(event) {
	var username = document.getElementById("Username");
	var password = document.getElementById("Password");
	
	if (username.value == "" || password.value == "") {
		if (username.value == "" && password.value == "") {
			alert("Please enter both your username and password.");
			return false;
		} else if (username.value != "" && password.value == "") {
			alert("Please enter your password.");
			password.focus();
			return false;
		} else if (username.value == "" && password.value != "") {
			alert("Please enter your username.");
			username.focus();
			return false;
		}
	} else {
		//database query
		var xhr = new XMLHttpRequest();
		xhr.onload = function () {
			let result = xhr.responseText;
			let jsonData = JSON.parse(result);
			let rowCount = jsonData.length;
		
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
					window.location.href = "./pages/exchange.html";
				} else {
					alert("Invalid username/password.");
				}
			}
		}
		xhr.open("GET", "./php/Login.php?username=" + username.value + "&password="+ password.value, true);
		xhr.send();
		return false;
	}
}

/** Script for difficult styling when hovering in main.
 *
 * @param e A mouse event of either type 'mouseenter' or 'mouseleave' 
*/
function mouseHoverMain(e) {
	const entering = (e.type == 'mouseenter') ? true : false;

	 // Div's covering background image
	for (let s of ['top', 'left', 'bottom', 'right']) {
		if (entering) document.getElementById(s).style.opacity = 0;
		else document.getElementById(s).style.removeProperty('opacity');
	}

	// 'main' tag styling
	const main = document.getElementsByTagName('main')[0];
	main.style.border = '2px solid ' + ((entering) ? 'transparent' : 'black');
	
	// Title
	const title = document.getElementsByClassName('title')[0];
	title.style.color = (entering) ? 'rgb(156 230 255)' : '#50d3ff';
	title.style.bottom = (entering) ? 'unset' : '100%';
	title.style.top = (entering) ? -main.getBoundingClientRect().top + 'px' : '-55px';
	title.style.padding = (entering) ? '-10px' : '0px';
}

function mouseEnterSubmit () {
	document.getElementsByTagName("body")[0].style.setProperty('--background-body', 
		'rgba(255, 255, 255, .2)');
}
function mouseLeaveSubmit () {
	document.getElementsByTagName("body")[0].style.setProperty('--background-body', 
		'rgba(255, 255, 255, .1)');
}