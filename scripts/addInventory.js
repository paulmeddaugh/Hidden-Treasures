var user = sessionStorage.getItem("uid");

function displayUser(){
	
	// AJAX for items owned
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var result = xhr.responseText;
			
			var jsonData = JSON.parse(result);
			var rowCount = jsonData.length;
		
			if (rowCount > 0) {
			let tstring = ["<table><tr><th>Item Name </th><th> Description </th><th> Quantity </th></tr>"];
			for (var i = 0; i < rowCount; i++) {
				var rowdata = jsonData[i];
				if (rowdata.quan != 0) {
					tstring.push("<tr><td>"+rowdata.Iname +"</td><td>"+rowdata.descrip+"</td><td>"+rowdata.quan+"</td></tr>");
				}
			}
			tstring.push("</table>");
			document.getElementById("dispTable").innerHTML = tstring.join('');
			}
		}
	}
	xhr.open("GET", "../php/displayIown.php?user=" + user);// 
	xhr.send();
}

function chkIname(alertError = true) {
	var item = document.getElementById("ItemName");
	checkEmpty(item);
	var itemS;
	if (item.value.length > 22) {
	 	if (alertError) alert("Item name cannot be over 22 characters");
		itemS = item.value.slice(0,0);
		document.getElementById("ItemName").value = itemS;
		document.getElementById("ItemName").focus();
		return false;
	}

	return true;
}
	
function chkIdes(alertError) {
	var des =  document.getElementById("itemDes");
	checkEmpty(des);
	var desS;
	if (des.value.length > 37) {
		if (alertError) alert("Item description cannot be over 37 characters.");
		desS = des.value.slice(0,0);
		document.getElementById("itemDes").value = desS;
		document.getElementById("itemDes").focus();
		return false;
	}

	return true;
}
	
function chkQuantity(event, alertError = true) {
	var quan = document.getElementById("myNumber");
	checkEmpty(quan);
	var quanS;
	if (quan.value > 1000) {
		if (alertError) alert("Quantity cannot exceed 1000 items.");
		quanS = quan.value.slice(0, 0);
		document.getElementById("myNumber").value = quanS;
		document.getElementById("myNumber").focus();
		if (event) event.preventDefault();
		return false;
	} 
	if (quan.value < 0) {
		if (alertError) alert("Quantity cannot be negative.");
		quanS = quan.value.slice(0,0);
		document.getElementById("myNumber").value = quanS;
		document.getElementById("myNumber").focus();
		if (event) event.preventDefault();
		return false;
	}

	return true;
}

function checkEmpty (x, alertError = true) {
	if (x?.value == '') {
		if (alertError) alert("Input cannot be empty.");
	}
}

function clrPg() {
	window.location.reload();
}

function chkEmpty(event) {

	let error = "", errorObject = null;

	var iName = document.getElementById("ItemName");
	var des = document.getElementById("itemDes");
	var quan = document.getElementById("myNumber");
	
	if (chkIname(false)) {
		error += "Please enter a valid item name.";
		errorObject = iName;
	}
	if (chkIdes(false)) {
		error += "Please enter a valid item description.";
		if (!errorObject) errorObject = des;
	}
	if (chkQuantity(false)) {
		error += "Please enter a valid item name.";
		errorObject = iName;
	}

	if (error) { // Invalid
		alert(error);
		errorObject.focus();
		return false;

	} else { // Valid
		var params;
		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "../php/addItems.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				alert(result);
				console.log(result);
				if (result.match(/Item Inserted!/g)) {
					window.open('addInventory.html', '_self');
				}
			}
		}
		
		//removes html from textboxes
		iName.value = iName.value.replace(/<[^>]*>/g, "").replace(/'/g, "''");
		des.value = des.value.replace(/<[^>]*>/g, "").replace(/'/g, "''");
		quan.value = quan.value.replace(/<[^>]*>/g, "").replace(/'/g, "''");
		//alert("No no");
		
		params = "iName="+iName.value+"&des="+des.value+"&quan="+quan.value+"&user="+user;
		xhr.send(params);
	}
	
	return false;
}
