var user = sessionStorage.getItem("uid");
console.log("user = " + user);

function displayUser() {
	
}

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
		document.getElementById("balance").select();
	}else{
		
		var params;
		
		var moneyToAdd = document.getElementById("balance");
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "../php/submitBalance.php", true);
		
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
			xhr.onreadystatechange = function () {
			
			if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				alert(result);
				console.log(result);
				if (result.match(/Money added!/g)){
					window.open('../pages/AccountInformation.html', '_self');
				}
			}
		}
		
			params = "moneyToAdd="+moneyToAdd.value+"&idUser="+user;
			xhr.send(params);
	}
	
	return tf;
	
}