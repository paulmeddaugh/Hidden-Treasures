var user = sessionStorage.getItem("uid");
console.log("user = " + user);

var x = [];
var itemIds = Array();

function displayUser() {
	
	var j = 0;
	
	var xhr = new XMLHttpRequest();
	
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				
				var jsonData = JSON.parse(result);
				var rowCount = jsonData.length;
				
				if (rowCount > 0) {
					tstring = "<table><tr><th> Item </th><th> Description </th>";
					tstring += "<th> Quantity<br />Available </th>";
					tstring += "<th> Quantity<br />On Market </th>";
					tstring += "<th> Price To Sell </th></tr> ";
					for (var i = 0; i < rowCount; i++) {
						var rowdata = jsonData[i];
						if(rowdata.quan != 0) {
							tstring += "<tr class=Item data-iid="+rowdata.Iid+"><td class=Name><i>"+rowdata.Iname+"</i></td>";
							tstring += "<td class=Description>"+rowdata.descrip+"</td>";
							tstring += "<td class=\"QuantityAvailable\">"+rowdata.quan+"</td>";
							tstring += "<td align=center>";
							tstring += "<input type=\"number\" value=\"0\" class=\"QuantityOnMarket\" min=\"0\"";
							tstring += " onblur=\"chkIfNegative(event)\"></input></td>";
							tstring += "<td align=center>$";
							tstring += "<input type=\"number\" value = \"0\" min=\"0\" max=\"999\" class=\"Price\"";
							tstring += "onblur=\"chkIfNegative(event)\"></input></td></tr>";
							
							x[j] = rowdata.Iid;
							j += 2;
						
						}
					}
				tstring += "</table>";
				document.getElementById("table").innerHTML = tstring;
				}
			}
		}
		xhr.open("GET", "../php/displayIown.php?user=" + user, false);
		xhr.send();
			 
	var xh = new XMLHttpRequest();
	xh.onreadystatechange = function () {
		if (xh.readyState == 4 && xh.status == 200) {
			var result = xh.responseText;
				
			var jsonData = JSON.parse(result);
			var rowCount = jsonData.length;
			
			//item will be a multidimensional array; first element, itemId, second, quantity
			var itemSold = Array();
				
			if (rowCount > 0) {
				
				for (var i = 0; i < rowCount; i++) {
					var rowdata = jsonData[i];
					var isAlreadyUsed = false;
					//goes through item array to see if same item already has other quantities on market
					for (a = 0; a < itemSold.length; a++) {
						if (rowdata.Iid == itemSold[a][1]) {
							itemSold[a][1] += rowdata.quan;
							isAlreadyUsed = true;
						}
					}
					if (isAlreadyUsed == false) {
						itemSold.push([rowdata.Iid, rowdata.quan]);
					}
				}
				//goes through every item in table to see if it has matching Iid's
					for (rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
						for (a = 0; a < itemSold.length; a++) {
							//every item has a data-Iid attribute with its Iid. Checks if they're same
							if (Number(table.rows[rowIndex].getAttribute('data-iid')) == Number(itemSold[a][0])) {
								var numOwned = Number(table.rows[rowIndex].cells[2].innerHTML);
								var quanAvailable = numOwned - Number(itemSold[a][1]);
								
								table.rows[rowIndex].cells[2].innerHTML = quanAvailable;
								//removes items that have 0 or less quantity available to sell
								if (quanAvailable < 0 || quanAvailable == 0) {
									table.deleteRow(rowIndex);
								}
								
							}
						}
					}
			}
		}
	}
	xh.open("GET", "../php/onSaleI.php?user=" + user, false);
	xh.send();
	
	for (i = 0; i < table.rows.length - 1; i++) {
		itemIds[i + 1] = table.rows[i + 1].dataset.iid;
	}
	
}

function chkIfNegative (event) {
	if (event.currentTarget.value < 0) {
		alert("The number entered must be a positive number.");
		event.currentTarget.focus();
		event.currentTarget.select();
		event.currentTarget.value = "0";
	}
	if (event.currentTarget.value == "") {
		alert("A number must be entered.");
		event.currentTarget.focus();
		event.currentTarget.select();
		event.currentTarget.value = "0";
	}
	/*if (event.currentTarget.value != event.currentTarget.value.match(/[0-9]+?\.?[0-9]{2}/)) {
		alert("Number must only have two decimal places.");
		event.currentTarget.focus();
		event.currentTarget.select();
		event.currentTarget.value = event.currentTarget.value.match(/[0-9]+\.?[0-9]{2}/);
	} */
	if (event.currentTarget.className == "Price") {
		if (Number(event.currentTarget.value) >= 1000) {
			alert("Price must be less than $1,000.");
			event.currentTarget.focus();
			event.currentTarget.select();
			event.currentTarget.value = "999";
		}
	}
	
	//find which textbox was being used and determine its index
	var onMarket = document.getElementsByClassName('QuantityOnMarket');
	var index = 0;
	for (i = 0; i < onMarket.length; i++) {
		if (event.currentTarget == onMarket[i]) {
			index = i;
		}
	}
	
	//finds column that has Number Owned by class
	var numOwned = document.getElementsByClassName('QuantityAvailable')[index];
	
	//if entered NumberOnMarket to sell is more than Number Owned
	if (Number(onMarket[index].value) > Number(numOwned.innerHTML)) {
		alert("You have more on the Market than you own.");
		event.currentTarget.focus();
		event.currentTarget.select();
		event.currentTarget.value = numOwned.innerHTML;
		//UpdateLeft(event);
	}
}

function SubmitData (event) {
	var inputs = document.getElementsByTagName("input");
	var num = inputs.length-1;
	var countEmpty = 0;
	var count = 0;
	var params;
	var Iid = [];
	var Iquanity  = [];
	var Iprice = [];
	var combined = [];
	var j = 0;
	var z = 0;
	var items = [];
	
	//alert("here1 " + x[4]);
	//alert("here1 " + itemIds.length-1);
	
	for(var q = 0; q < itemIds.length-1; q++){
		items[z] = itemIds[q+1];
		z += 2;
	}
		
	for(var i = 0; i < inputs.length-1; i++){
		if(i % 2 == 0){
			if(inputs[i].value == 0){
				countEmpty++;	
			}
			if(inputs[i].value != 0){
				Iquanity[j] = inputs[i].value;
				Iprice[j] = inputs[i+1].value;
				Iid[j] = items[i];
				//Iid[j] = x[i];
				j++;
			}
		}
	}
	if(countEmpty == num / 2){
		alert("No items placed on market");
	}
	else{
		for(var k = 0; k < Iid.length; k++){
			combined[k] = "(NULL," + Iid[k] + "," + user + "," + Iquanity[k] + "," + Iprice[k] + ")";
			//alert(combined[k]);
		}
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "../php/SellItems.php", true);
		
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		xhr.onload = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				alert(result);
				console.log(result);
				
				if(result.match(/Items Updated!/g)){
					window.open('../pages/exchange.html', '_self');	
				}
				
			}
		}
		console.log("user = " + user);
		//alert("json here" + JSON.stringify(Iquanity));
	
		params = "combined="+ JSON.stringify(combined);
		xhr.send(params);
		
	}
	
	//print data on log
	/*
	var rows = document.getElementsByClassName('Item');
	var onMarket = document.getElementsByClassName('QuantityOnMarket');
	var price = document.getElementsByClassName('Price');
	var name = document.getElementsByClassName('Name');
	var description = document.getElementsByClassName('Description');
	for (i = 0; i < rows.length; i++) {
		console.log("Name: " + name[i].textContent + "\nDescription: " + description[i].innerHTML + "\nQuantity On Market: " + 
			onMarket[i].value + "\nPrice: " + price[i].value + "\nItem id: " + rows[i].id);
	}
	event.preventDefault();*/
}




/*function chkIfMax(event) {
	console.log("hi");
	//find which textbox was being used and determine its index
	var textboxes = document.getElementsByClassName('QuantityOnMarket');
	var index = 0;
	for (i = 0; i < textboxes.length; i++) {
		if (event.currentTarget == textboxes[i]) {
			index = i;
		}
	}
	
	//finds column that has Number Owned by class
	var numOwned = document.getElementsByClassName('QuantityAvailable')[index];
	
	//if Number On Market is more than Number Owned
	if (textboxes[index].value > numOwned.innerHTML) {
		alert("You have more on the Market than you own.");
		event.currentTarget.focus();
		event.currentTarget.select();
		event.currentTarget.value = numOwned.innerHTML;
		//UpdateLeft(event);
	}
}*/



/*function chkbxClicked(event) {
	//find the index of checkbox clicked
	var checkboxes = document.getElementsByClassName('Check');
	var index = 0;
	for (i = 0; i < checkboxes.length; i++) {
		if (event.currentTarget == checkboxes[i]) {
			index = i;
		}
	}
	
	//if unchecked, disable textboxes with that index and makes row grey
	var numOnMarket = document.getElementsByClassName('QuantityOnMarket')[index];
	var price = document.getElementsByClassName('Price')[index];
	var row = document.getElementsByClassName('Item')[index];
	if (event.currentTarget.checked == false) {
		numOnMarket.disabled = true;
		price.disabled = true;
		row.style.backgroundColor = "#303030";
	} else { //enables textboxes and makes row black
		numOnMarket.disabled = false;
		price.disabled = false;
		row.style.backgroundColor = "#000000";
	}
} */

/*this function is called when a QuantityOnMarket textbox input is changed
function UpdateLeft(event) {
	//checks if text entered is a positive number
	if (event.currentTarget.value.search(/[^0-9]+/) == -1) {
		//find index of the row
		var rows = document.getElementsByClassName('Item');
		var index = 0;
		for (i = 0; i < rows.length; i++) {
			if (event.target.parentNode.parentNode == rows[i]) {
				index = i;
			}
		}
		
		var numOwned = document.getElementsByClassName('QuantityOwned');
		var onMarket = document.getElementsByClassName('QuantityOnMarket');
		var numLeft = document.getElementsByClassName('NumberLeft');

		//updates Number Left column
		if (event.currentTarget.value == "") {
			numLeft[index].innerHTML = numOwned[index].innerHTML;
		} else {
			numLeft[index].innerHTML = numOwned[index].innerHTML - event.currentTarget.value;
		}
	}
}
function AddItem(event) {
	//find index of the row
	var rows = document.getElementsByClassName('Item');
	
	
	var index = 0;
	for (i = 0; i < rows.length; i++) {
		if (event.target.parentNode.parentNode == rows[i]) {
			index = i;
		}
	}
	
	var headItems = document.getElementsByClassName('headItem');
	for (i = 0; i < headItems.length; i++) {
		if (event.target.parentNode.parentNode == headItems[i]) {
			item[i].numOfDuplicates++;
			console.log(item[i].numOfDuplicates);
		}
	}
	
	//duplicates currentRow
	var currentRow = event.target.parentNode.parentNode;
	var duplicateRow = currentRow.cloneNode(true);
	
	//change plus button to minus button
	var minusBtn = duplicateRow.getElementsByClassName("+")[0];
	minusBtn.setAttribute('class', "-");
	minusBtn.style.backgroundColor = "#E61C1C";
	minusBtn.style.borderColor = "#E61C1C";
	minusBtn.name = "Minus";
	minusBtn.value = "Remove Item";
	minusBtn.setAttribute('onclick', "RemoveItem(event)");
	minusBtn.setAttribute('data-parentRow', currentRow.);
	
	//inserts duplicateRow after currentRow
	var table = document.getElementById("table");
	table.rows[index + 1].after(duplicateRow);
}
function RemoveItem(event) {
	var headItems = document.getElementsByClassName('headItem');
	for (i = 0; i < headItems.length; i++) {
		if (event.target.parentNode.parentNode == headItems[i]) {
			item[i].numOfDuplicates--;
		}
	}
	
	var table = document.getElementById("table");
	var currentRow = event.target.parentNode.parentNode;
	table.deleteRow(currentRow.rowIndex);
} */
