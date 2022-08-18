let user = sessionStorage.getItem("uid");

let x = [];
let itemIds = Array();

function displayUser() {
	
	let j = 0;
	
	// AJAX for diplaying items in inventory
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {

			let result = xhr.responseText, jsonData;
			try {
				jsonData = JSON.parse(result);
			} catch {
				alert(result);
				console.log(result);
			}

			let rowCount = jsonData.length;
			
			if (rowCount > 0) {
				// Table header
				tstring = `<table><tr><th> Item </th><th> Description </th>
							<th> Owned </th>
							<th> Not On Market </th>
							<th> Quantity To Sell </th>
							<th> Price To Sell </th></tr>`;
				for (var i = 0; i < rowCount; i++) {
					var rowdata = jsonData[i];
					if (rowdata.quan != 0) {
						// Table row
						tstring += `<tr class=Item data-iid=${rowdata.Iid}>
								<td class=Name><i>${rowdata.Iname}</i></td>
								<td class=Description>${rowdata.descrip}</td>
								<td class=\"QuantityOwned\">${rowdata.quan}</td>
								<td class=\"QuantityAvailable\">${rowdata.quan}</td>
								<td align=center>
								<input type=\"number\" value=\"0\" class=\"QuantityOnMarket\" min=\"0\"
								onchange=\"chkIfNegative(event)\"></input></td>
								<td align=center>$
								<input type=\"number\" value = \"0\" min=\"0\" max=\"999\" class=\"Price\"
								onchange=\"chkIfNegative(event)\"></input></td>
							</tr>`;
						
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
			 
	// AJAX for getting items on market
	const xh = new XMLHttpRequest();
	xh.onreadystatechange = function () {
		if (xh.readyState == 4 && xh.status == 200) {

			let result = xh.responseText, jsonData;	
			try {
				jsonData = JSON.parse(result);
			} catch {
				console.log(result);
			}

			var rowCount = jsonData.length;
			
			// Ttem will be a multidimensional array: first dimension - itemId, second - [id, quan, price]
			var itemSold = Array();
				
			if (rowCount > 0) {
				
				for (let i = 0; i < rowCount; i++) {
					var rowdata = jsonData[i];
					var isAlreadyUsed = false;
					// Goes through item array to see if same item already has other quantities on market
					for (let a = 0; a < itemSold.length; a++) {
						if (rowdata.Iid == itemSold[a][0]) {
							itemSold[a][1] += Number(rowdata.quan);
							isAlreadyUsed = true;
						}
					}
					if (isAlreadyUsed == false) {
						itemSold.push([rowdata.Iid, Number(rowdata.quan), rowdata.price]);
					}
				}
				// Goes through every item in table to see if it has matching Iid's
				for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
					for (let a = 0; a < itemSold.length; a++) {
						// Every item that has a data-Iid attribute with its Iid, checks if they're same
						if (Number(table.rows[rowIndex].getAttribute('data-iid')) == Number(itemSold[a][0])) {
							var numOwned = Number(table.rows[rowIndex].cells[3].innerHTML);
							var quanAvailable = numOwned - Number(itemSold[a][1]);
							let price = Number(itemSold[a][2]);
							
							table.rows[rowIndex].cells[3].innerHTML = quanAvailable;
							table.rows[rowIndex].cells[5].children[0].value = price;
							// Removes items that have 0 or less quantity available to sell
							if (quanAvailable <= 0) {
								table.rows[rowIndex].cells[3].innerHTML = '0';
								for (let i = 4; i <= 5; i++) {
									table.rows[rowIndex].cells[i].children[0].disabled = true;
									table.rows[rowIndex].cells[i].children[0].classList.add('disableArrowSpinners');
								}
							}
						}
					}
				}
			}
		}
	}
	xh.open("GET", "../php/onSaleI.php?user=" + user, false);
	xh.send();
	
	for (let i = 0; i < table.rows.length - 1; i++) {
		itemIds[i + 1] = table.rows[i + 1].dataset.iid;
	}
}

function chkIfNegative (event) {
	if (event.currentTarget.value < 0) {
		alert("The number entered must be a positive number.");
		event.currentTarget.focus();
		event.currentTarget.value = "0";
	}
	if (event.currentTarget.value == "") {
		alert("A number must be entered.");
		event.currentTarget.focus();
		event.currentTarget.value = "0";
	}
	if (event.currentTarget.className == "Price") {
		if (Number(event.currentTarget.value) >= 1000) {
			alert("Price must be less than $1,000.");
			event.currentTarget.focus();
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
				j++;
			}
		}
	}
	if (countEmpty == num / 2) {
		alert("No items placed on market");
	}
	else{
		for (var k = 0; k < Iid.length; k++) {
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
				
				if (result.match(/Items Updated!/g)) {
					window.open('../pages/exchange.html', '_self');	
				}
				
			}
		}
	
		params = "combined="+ JSON.stringify(combined);
		xhr.send(params);
	}

	return false;
}