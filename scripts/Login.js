function chkIfAllFieldsEntered() {

	let error = "", errorObject;
	var username = document.getElementById("Username");
	var password = document.getElementById("Password");
	
	// Checks if fields empty
	if (username.value == "") {
		error = "Username cannot be empty.";
		errorObject = username;
	}
	if (password.value == "") {
		error = (error == "") ? "Password cannot be empty." : "Username and password are empty.";
		if (!errorObject) errorObject = password;
	}
	
	if (error != "") { // Invalid
		alert(error);
		errorObject.focus();
		return false;

	} else { // Valid
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "./php/Login.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {

				let result = xhr.responseText, jsonData;
				try {
					jsonData = JSON.parse(result);
				} catch {
					alert(result);
					console.log(result);
					return false;
				}
			
				if (jsonData.length > 0) {
					const userData = jsonData[0];

					if (username.value.toLowerCase() == userData.username.toLowerCase() &&
							password.value == userData.password) {
						sessionStorage.setItem("uid", userData.uid);
						sessionStorage.setItem('username', userData.username);
						sessionStorage.setItem('nameu', userData.nameu);
						sessionStorage.setItem('balance', userData.balance);
						window.location.href = "./pages/exchange.html";
					} else {
						alert("Invalid username or password.");
					}
				} else {
					alert("No username with that password found.");
				}
			}
		}
		xhr.send(("username=" + username.value + "&password="+ password.value));
	}

	return false;
}

window.addEventListener("load", () => {
	const e = {type: 'mouseenter'};
	return mouseHoverMain(e);
});

/** Script for difficult styling when hovering in main.
 *
 * @param e A mouse event of either type 'mouseenter' or 'mouseleave' 
*/
function mouseHoverMain(e) {
	
	const entering = (e.type == 'mouseenter') ? true : false;

	 // Div's covering background image
	for (let s of ['top', 'left', 'bottom', 'right']) {
		if (entering) {
			document.getElementById(s).style.opacity = 0;
		} else {
			document.getElementById(s).style.removeProperty('opacity');
		}
	}

	// Title
	const title = document.getElementsByClassName('title')[0];
	const main = document.getElementsByTagName('main')[0];
	title.style.top = (entering) ? -main.getBoundingClientRect().top + 'px' : '-55px';
}

function mouseEnterSubmit () {
	document.getElementsByTagName("body")[0].style.setProperty('--background-body', 
		'rgba(255, 255, 255, .2)');
}
function mouseLeaveSubmit () {
	document.getElementsByTagName("body")[0].style.setProperty('--background-body', 
		'rgba(255, 255, 255, .1)');
}