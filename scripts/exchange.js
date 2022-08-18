var user = sessionStorage.getItem("uid");

var priceA = [];
var sellerIDs = [];
var IidA = [];
var Iname = [];
var des = [];
var forsaleID = [];

function displayUser() {
	
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {

			let result = xhr.responseText, jsonData;
			try {
				jsonData = JSON.parse(result);
			} catch {
				alert(result);
				return;
			}
			const rowCount = jsonData.length;
				
			if (rowCount > 0) {

				let tstring = `
					<table>
						<tr>
							<th> Item Name </th>
							<th> Description </th>
							<th> Seller </th>
							<th> Price </th>
							<th> Quantity Available </th>
							<th> Quantity To Buy </th>
						</tr>`;
				for (var i = 0; i < rowCount; i++) {
					var rowdata = jsonData[i];
					if (rowdata.sellquan > 0) {
						const j = priceA.length;
						tstring += `
							<tr>
								<td><i> ${rowdata.Iname}</i></td>
								<td class=q>${rowdata.descrip}</td>
								<td>${rowdata.username}</td>
								<td>$${rowdata.Sellprice}</td>
								<td>${rowdata.sellquan}</td>
								<td>
									<input value=\"0\" type=number min=0 id=\"numToBuy\"
									oninput=\"chkQuantity(${rowdata.sellquan}, ${priceA.length})\">
								</td>
							</tr>`;

						priceA.push(rowdata.Sellprice);
						sellerIDs.push(rowdata.sellId);
						IidA.push(rowdata.Iid);
						Iname.push(rowdata.Iname);
						des.push(rowdata.descrip);
						forsaleID.push(rowdata.saleID);
					}
				}
				
				tstring += '</table>';
				document.getElementById("dispTable").innerHTML = tstring;
			}
		}
	}
	xhr.open("GET", "../php/displayEx.php?");
	xhr.send();
}

function chkQuantity(quan, rownum) {

	const inputs = document.querySelectorAll('input[type="number"]');

	if (inputs[rownum].value == "") {
		alert("Please enter a new number.");
		inputs[rownum].value = 0;
		inputs[rownum].focus();
	}
	
	if (inputs[rownum].value > quan) {
		alert("Quantity exceeds the number available.");
		inputs[rownum].focus();
		inputs[rownum].value = quan;
	} 
	
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].value < 0) {
			alert("Quantity cannot be negative");
			inputs[i].value = 0;
			inputs[i].focus();
		}
	}
}

function chkqty() {

	let inputs = document.querySelectorAll('input[type="number"]');
	
	// Checks if any item quantities are greater than 1
	if (Array.from(inputs).every(input => input.value == "0")) {
		alert("No items bought!");
		return false;

	} else { // Exchange items

		// For each row buying something, adds to arrays sent for the SQL queries to send one AJAX request
		let Totalprice = 0;
		let buyQuan = [];
		let priceWOtax = [];
		let finSellerID = [];
		let finIid = [];
		let sellers = [];
		let Totalprices = [];
		let description = [];
		let ItemName = [];
		let soldIDs = [];
		let combined = [], combined2 = [], combined3 = [], combined4 = [], combined5 = [], combined6 = [];

		// Build INSERT for 'Transactions' table ---------------------------------------------
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].value > 0) { // Checks that quantity is greater than 0

				const withoutTax = (user == sellerIDs[i]) ? 0 : priceA[i] * inputs[i].value;
				const finalPrice = (user == sellerIDs[i]) ? 0 : (withoutTax * 1.08);

				priceWOtax.push(withoutTax);
				buyQuan.push(inputs[i].value);
				finSellerID.push(sellerIDs[i]);
				finIid.push(IidA[i]);
				ItemName.push(Iname[i]);
				description.push(des[i]);
				soldIDs.push(forsaleID[i]);

				combined.push("(NULL," + buyQuan[buyQuan.length - 1] + "," + finalPrice + "," + user + "," 
					+ finSellerID[finSellerID.length - 1] + "," + finIid[finIid.length - 1] + ")");
				Totalprice += finalPrice;
			}
		}

		// Build ending UPDATE query for seller balances----------------------------------------------
		
		// Determines sellerId
		for (let index = 0; index < finSellerID.length; index++) {
			if (index == 0 || (finSellerID[index] != user && finSellerID[index] != finSellerID[index -1])) {
				sellers.push(finSellerID[index]);
			}
		}
		
		// Determines total price
		for (var a = 0; a < sellers.length; a++) {
			let hold = 0;
			for (var v = 0; v < finSellerID.length; v++) {
				if (sellers[a] == finSellerID[v]) {
					hold += priceWOtax[v];
				}
			}

			Totalprices[a] = hold;
		}

		// Creates ending UPDATE query
		for (var n = 0; n < Totalprices.length; n++) {
			combined2[n] = "WHEN idUser = " + sellers[n] + " THEN curBal %2B " + Totalprices[n];
		}

		// Build INSERT INTO VALUES for 'Inventory' table ----------------------------------------------------------
		for (var b = 0; b < buyQuan.length; b++) {
			if (user != finSellerID[b]) {
				combined3.push("(NULL,'" + ItemName[b] + "', '" + description[b] + "')");
			}
		}
		
		// Build ending INSERT for 'Owns' table--------------------------------------------------------------
		for (var g = 0; g < buyQuan.length; g++) {
			if (user != finSellerID[g]) {
				if (g == 0) {
					combined4.push("(last_insert_id()," + user + "," + buyQuan[g] + ")");
				} else {
					combined4.push("(last_insert_id()%2B" + (combined.length - 1) + "," + user + "," 
						+ buyQuan[g] + ")");
				}
			}
		}
		//--------------------------------------------------------------------------------------------
		
		// Build ending UPDATE for 'Sells' and 'Owns' table's quantity
		for (var d = 0; d < soldIDs.length; d++) {
			combined5[d] = "WHEN `4sale_id` = " + soldIDs[d] + " THEN quantity %2D " + buyQuan[d];
			if (finSellerID[d] != user) {
				combined6.push("WHEN item_idInventory = " + finIid[d] + " THEN quantity %2D " + buyQuan[d]);
			}
		}
		// -------------------------------------------------------------------------------------
		if (Totalprice > sessionStorage.getItem("balance")) {
			alert("Total price of items bought is over your balance.\nPlease decrease your items or add money to balance.");
			return false;
		} else {
			
			// AJAX to perform exchange
			const xhr = new XMLHttpRequest();
			xhr.open("POST", "../php/buyItems.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {

					const result = xhr.responseText;
					alert(result);
					console.log(result);
					
					if (result.match(/Items Bought!/g)) {
						window.open('AccountInformation.html', '_self');
					}
				}
			}
		
			const params = "TotalPrice=".concat(Totalprice)
				.concat("&combined=" + JSON.stringify(combined))
				.concat("&combined2=" + JSON.stringify(combined2))
				.concat("&combined3=" + JSON.stringify(combined3))
				.concat("&combined4=" + JSON.stringify(combined4))
				.concat("&combined5=" + JSON.stringify(combined5))
				.concat("&combined6=" + JSON.stringify(combined6))
				.concat("&user=" + user);

			xhr.send(params);
		}
	}

	return false;
}