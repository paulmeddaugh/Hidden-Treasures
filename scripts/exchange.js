var user = sessionStorage.getItem("uid");
console.log("user = " + user);

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
			var result = xhr.responseText;
			
			var jsonData = JSON.parse(result);
			var rowCount = jsonData.length;
				
			if (rowCount > 0) {

				var tstring = ["<table>",
					"<tr><th> Item Name </th><th> Description </th><th> Seller </th>",
					"<th> Price </th><th> Quantity Available </th><th> Quantity To Buy </th></tr>"];
				let j = 0;
				for (var i = 0; i < rowCount; i++) {
					var rowdata = jsonData[i];
					if (rowdata.sellquan > 0) {
						tstring.push("<tr><td><i>"+rowdata.Iname+"</i></td>",
							"<td class=q>"+rowdata.descrip+"</td>",
							"<td>"+rowdata.username+"</td>",
							"<td>$"+rowdata.Sellprice+"</td>",
							"<td>"+rowdata.sellquan+"</td>",
							"<td><input value=\"0\" type=number min=0 id=\"numToBuy\" ",
							"oninput=\"chkQuantity("+rowdata.sellquan+","+j+")\"></td></tr>");
						
						priceA[j] = rowdata.Sellprice;
						sellerIDs[j] = rowdata.sellId;
						IidA[j] = rowdata.Iid;
						Iname[j] = rowdata.Iname;
						des[j] = rowdata.descrip;
						forsaleID[j] = rowdata.saleID;
						j++;
					}
				}
				
				tstring.push("</table>");
				document.getElementById("dispTable").innerHTML = tstring.join("");
			}
		}
	}
	xhr.open("GET", "../php/displayEx.php?");
	xhr.send();
}

function chkQuantity(quan, rownum) {
		var inputs = document.getElementsByTagName("input");
		var tr = document.getElementsByTagName("tr");
		var quantity = document.getElementsByClassName("q");
		var quanS = 0;
		if (inputs[rownum].value == "") {
			alert("Please enter a new number.");
				document.getElementsByTagName("input")[rownum].value = 0;
				document.getElementsByTagName("input")[rownum].focus();
				document.getElementsByTagName("input")[rownum].select();
		}
		
		if (inputs[rownum].value > quan) {
				alert("Quantity exceeds the number available.");
				//document.getElementById("numToBuy").style.setProperty('--focus-outline', '2px solid red');
				document.getElementById("numToBuy").focus();
				document.getElementById("numToBuy").value = quan;
			} 
		
		var totalPrice = 0;
		var hasAlreadyAlerted = false;
		for(var i = 0; i < inputs.length - 1; i++){
			if(inputs[i].value < 0) {
				alert("Quantity cannot be negative");
				quanS = inputs[i].value.slice(0,0);
				document.getElementsByTagName("input")[i].value = quanS;
				document.getElementsByTagName("input")[i].focus();
				document.getElementsByTagName("input")[i].select();
			}
			/*if(inputs[i].value * tr[i+1].getElementsByTagName("td")[4].innerHTML.slice(1) > sessionStorage.getItem("balance") &&
			   user != sellerIDs[i]){
				quanS = inputs[i].value.slice(0,0);
				document.getElementsByTagName("input")[i+1].value = quanS;
				document.getElementsByTagName("input")[i+1].focus();
				document.getElementsByTagName("input")[i+1].select();
				hasAlreadyAlerted = true;
				alert("Price of item to buy exceeds your balance (includes tax).");// only check one input
			}*/
			totalPrice += inputs[i].value * tr[i+1].getElementsByTagName("td")[4].innerHTML.slice(1) * 1.08;
		}
		/*if (totalPrice > sessionStorage.getItem("balance") && hasAlreadyAlerted == false) {
			if (hasAlreadyAlerted == false) {
				document.getElementsByTagName('submit').focus();
				document.getElementsByTagName('submit').select();
				alert("Quantity amount exceeds your balance");
			}
		}*/
	}
	
	function chkqty(){
		var inputs = document.getElementsByTagName("input");
		var countEmpty = 0;
		var buyQuan = [];
		var finPrice = [];
		var priceWOtax = [];
		var finSellerID = [];
		var oneSeller = [];
		var finIid = [];
		var combined = [];
		var combined2 = [];
		var combined3 = [];
		var combined4 = [];
		var combined5 = [];
		var combined6 = [];
		var sellers = [];
		var allSellers = [];
		var Totalprice = 0;
		var Totalprices = [];
		var j = 0;
		var p = 0;
		var q = 0;
		var y = 0;
		var h = 0;
		var hold = 0;
		var description = [];
		var ItemName = [];
		var soldIDs = [];
		
		
		for(var i = 0; i < inputs.length-1; i++){
			if(inputs[i].value == 0){
				countEmpty++;
			}
		}
		if(countEmpty == inputs.length-1){
			alert("No items bought!");
		}
		else{
			// building insert for transaction table ---------------------------------------------
			
			
			for(var i = 0; i < inputs.length-1; i++){
				if( inputs[i].value != 0){// make sure is not empty value
				if(user == sellerIDs[i]){ // check to see if user is buying stuff back
					buyQuan[j] = inputs[i].value;
					finPrice[j] = 0;
					priceWOtax[j] = 0;
					finSellerID[j] = sellerIDs[i];
					finIid[j] = IidA[i];
					ItemName[j] = Iname[i];
					description[j] = des[i];
					soldIDs[j] = forsaleID[i];
					j++;
				}else{
				// multiply price * quantity * 
				buyQuan[j] = inputs[i].value;
				finPrice[j] = (((priceA[i] * inputs[i].value) * 0.08) + (priceA[i] * inputs[i].value));
				priceWOtax[j] = priceA[i] * inputs[i].value;
				finSellerID[j] = sellerIDs[i];
				finIid[j] = IidA[i];
				ItemName[j] = Iname[i];
				description[j] = des[i];
				soldIDs[j] = forsaleID[i];
				j++;
				 } 
				}
			}
			for(var k = 0; k < buyQuan.length; k++){
				combined[k] = "(NULL," + buyQuan[k] + "," + finPrice[k] + "," + user + "," + finSellerID[k] + "," + finIid[k] + ")";
				Totalprice += finPrice[k];
				//alert(combined[k]);
			}
			//-------------------------------------------------------------------------------------------
			
			
			
			
			// build update for seller balances------------------------------------------------------------
			for(var m = 0; m < finSellerID.length; m++){
				if(m == 0){
					sellers[p] = finSellerID[m];
					p++;
				}
				if(finSellerID[m] != user && finSellerID[m] != finSellerID[m -1] && m != 0){
					sellers[p] = finSellerID[m];
					p++;
				}
			}
			for(var a = 0; a < sellers.length; a++){
				for(var v = 0; v < finSellerID.length; v++){
					if(sellers[a] == finSellerID[v]){
						hold += priceWOtax[v];
						Totalprices[a] = hold;
					}
				}
				hold = 0;
			}
			for(var n = 0; n < Totalprices.length; n++){
				combined2[n] = "WHEN idUser = " + sellers[n] + " THEN curBal %2B " + Totalprices[n];
				//alert(combined2[n]);
			}
			//---------------------------------------------------------------------------------------
			// delete
			
			
			// build insert into inventory----------------------------------------------------------
			for(var b = 0; b < buyQuan.length; b++){
				if (user != finSellerID[b]) {
					combined3[y] = "(NULL," + "'" + ItemName[b] + "'" + "," + "'" + description[b] + "'" + ")";
					y++;
				}
			}
			
			
			// build insert for owns table--------------------------------------------------------------
			
			for(var g = 0; g < buyQuan.length; g++){
				if(user != finSellerID[g]){
				if(g == 0){
				combined4[h] = "(last_insert_id()," + user + "," + buyQuan[g] + ")";
				h++;
				}else{
					combined4[h] = "(last_insert_id()%2B" + h + "," + user + "," + buyQuan[g] + ")";
					h++;
				}
				}
			}
			//--------------------------------------------------------------------------------------------
			
			//build update for sells  and owns table's quanity 
			for(var d = 0; d < soldIDs.length; d++){
				combined5[d] = "WHEN `4sale_id` = " + soldIDs[d] + " THEN quantity %2D " + buyQuan[d];
				if(finSellerID[d] != user){
				combined6[q] = "WHEN item_idInventory = " + finIid[d] + " THEN quantity %2D " + buyQuan[d];
				q++;
				}
				
			}
			// -------------------------------------------------------------------------------------
			if (Totalprice > sessionStorage.getItem("balance")){
			alert("Total price of items bought is over your balance. \n Please decrease your items or add money to balance");
			return false;
		} else {
			
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "../php/buyItems.php", true);
			
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			
			 xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
					var result = xhr.responseText;
					alert(result);
					console.log(result);
					
					if(result.match(/Items Bought!/g)){
					window.open('AccountInformation.html', '_self');
					}
					
				}
			}
			 console.log("user = " + user);
			
			 params = "combined="+ JSON.stringify(combined) + "&TotalPrice=" + Totalprice;
			 params += "&combined2=" + JSON.stringify(combined2) + "&combined3=" + JSON.stringify(combined3);
			 params += "&combined4=" + JSON.stringify(combined4) + "&combined5=" + JSON.stringify(combined5);
			 params += "&combined6=" + JSON.stringify(combined6) + "&user=" + user;
			 xhr.send(params);
		}
		}
	}