var user = sessionStorage.getItem("uid");

function displayUser(){
	document.getElementById("usn").innerHTML = "Username: " + sessionStorage.getItem("username");
	document.getElementById("name").innerHTML = "Name: " + sessionStorage.getItem("nameu");
	
	// AJAX for items owned
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var result = xhr.responseText;
			
			var jsonData = JSON.parse(result);
			var rowCount = jsonData.length;
			
			if (rowCount > 0) {
				var tstring = "<table id = " + "Inventory" + "><tr><th> Item </th><th> Description </th> <th> Quantity </th></tr> ";
				for (var i = 0; i < rowCount; i++) {
					var rowdata = jsonData[i];
					if (rowdata.quan != 0) {
						tstring += "<tr class = "+"Item"+"><td class = Name><i>"+rowdata.Iname+"</i><br /></td><td class = "+"Description";
						tstring +=">"+rowdata.descrip+"</td><td class = "+"Quantity"+">"+rowdata.quan+"</td></tr>";
					}
				}
				sessionStorage.setItem('balance', rowdata.balance);
				document.getElementsByTagName('info-box-component').balance = sessionStorage.getItem('balance');
				tstring += "</table>";
				document.getElementById("dispTable").innerHTML = tstring;
			}
		}
	}
	xhr.open("GET", "../php/displayIown.php?user=" + user);// 
	xhr.send();
			 
	// AJAX for items bought
	var xh = new XMLHttpRequest();
	xh.onreadystatechange = function () {
		if (xh.readyState == 4 && xh.status == 200) {
			var result = xh.responseText;
					
			var jsonData = JSON.parse(result);
			var rowCount = jsonData.length;
					
			if (rowCount > 0) {
				var txtstring = "<table id = "+"Bought"+"><tr><th> Item </th><th> Description</th><th> Quantity </th><th> Price Bought </th></tr> ";
				for (var i = 0; i < rowCount; i++) {
					var rowdata = jsonData[i];
					if(rowdata.quan != 0){
						txtstring += "<tr class = "+"Item"+"><td><i>" +rowdata.Ibought + "</i></td><td>"+rowdata.IBdes+"</td>";
						txtstring += "<td class = "+"Quantity"+">"+rowdata.IBquan+"</td><td class = "+"PriceBought"+">$"+rowdata.IBprice+"</td></tr>";
					}
				}
				txtstring += "</table>";
				document.getElementById("dispTable2").innerHTML = txtstring;
			}
		}
	}
	xh.open("GET", "../php/displayBuy.php?user=" + user);// 
	xh.send();
	
	// AJAX for items sold
	var x = new XMLHttpRequest();
	x.onreadystatechange = function () {
		if (x.readyState == 4 && x.status == 200) {
			var result = x.responseText;
			
			var jsonData = JSON.parse(result);
			var rowCount = jsonData.length;
			
			if (rowCount > 0) {
				var txtstring = "<table id = " +"Sold"+"><tr><th> Item </th><th> Description</th><th> Quantity </th><th> Price Sold </th></tr> ";
				for (var i = 0; i < rowCount; i++) {
					var rowdata = jsonData[i];
					if(rowdata.quan != 0){
						txtstring += "<tr class = "+"Item"+"><td><i>" +rowdata.Isold + "</i></td><td>"+rowdata.ISdes+"</td>";
						txtstring += "<td class = "+"Quantity"+">"+rowdata.ISquan+"</td><td class = "+"PriceSold"+">$"+rowdata.ISprice+"</td></tr>";
					}
				}
				txtstring += "</table>";
				document.getElementById("dispTable3").innerHTML = txtstring;
			}
		}
	}
	x.open("GET", "../php/displaySell.php?user=" + user);// 
	x.send();
}