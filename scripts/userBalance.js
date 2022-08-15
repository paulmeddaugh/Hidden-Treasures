var user = sessionStorage.getItem("uid");

function check(EleId, corForm){
	var varSlice;
	if (corForm && EleId.value <= 1000) {
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

function chkBalance(){
	var balance = document.getElementById("balance");
	var corForm = /^[0-9]*$/.test(balance.value);
	
	if (check(balance,corForm) == 1){
		alert("Please enter a number up to 1000");
	}
}

function chkEmpty(){
	var tf = true;
	var bal = document.getElementById("balance");
	
	if (bal.value == "" && tf != false){
		tf = false;
		alert("Box(s) is empty cannot proceed");
		document.getElementById("balance").focus();
	} else {
		
		var moneyToAdd = document.getElementById("balance");
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "../php/submitBalance.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				const result = xhr.responseText;
				alert(result);
				console.log(result);
				if (result.match(/Money added!/g)) {
					sessionStorage.setItem('balance', 
						Number(sessionStorage.getItem('balance')) + Number(moneyToAdd.value));
					window.open('../pages/AccountInformation.html', '_self');
				}
			}
		}
		
		const params = "moneyToAdd=" + moneyToAdd.value + "&idUser=" + user;
		xhr.send(params);
	}
	
	return false;
}