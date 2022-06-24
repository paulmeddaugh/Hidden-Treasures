var user = sessionStorage.getItem("uid");
console.log("user = " + user);

function displayUser(){
	document.getElementById("duser").innerHTML = "Account: " + sessionStorage.getItem("username");
	document.getElementById("bal").innerHTML = "Current Balance: " + sessionStorage.getItem('balance');
	
	var xhr = new XMLHttpRequest();
			 xhr.onreadystatechange = function () {
			 if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				
				var jsonData = JSON.parse(result);
				console.log(result);
				var rowCount = jsonData.length;
				
				 if (rowCount > 0) {
					var tstring = "<table align=" + "right" + "><tr><th>Item Name </th>";
					tstring += "<th>Description </th><th>Quantity </th></tr>";
					for (var i = 0; i < rowCount; i++) {
						var rowdata = jsonData[i];
						if(rowdata.quan != 0){
						tstring += "<tr><td>"+rowdata.Iname +"</td><td>"+rowdata.descrip+"</td><td>"+rowdata.quan+"</td></tr>";
						}
					}
					tstring += "</table>";
					document.getElementById("dispTable").innerHTML = tstring;
				    console.log(result);
				  }
			  }
			}
			 xhr.open("GET", "../AccountInformation/displayIown.php?user=" + user);// 
			 xhr.send();
}

function chkIname(){
		var item =  document.getElementById("ItemName");
		var itemS;
		if(item.value.length > 22){
			alert("Item name cannot be over 22 characters");
			itemS = item.value.slice(0,0);
			document.getElementById("ItemName").value = itemS;
			document.getElementById("ItemName").focus();
			document.getElementById("ItemName").select();
		} 
		console.log("Item name:" + item.value);
	}
	
	function chkIdes(){
		var des =  document.getElementById("itemDes");
		var desS;
		if(des.value.length > 37){
			alert("Item description cannot be over 37 characters");
			desS = des.value.slice(0,0);
			document.getElementById("itemDes").value = desS;
			document.getElementById("itemDes").focus();
			document.getElementById("itemDes").select();
		} 
		console.log("Item description:" + des.value);
	}
	
	function chkQuantity(){
		var quan =  document.getElementById("myNumber");
		var quanS;
		if(quan.value > 1000){
			alert("Quantity cannot exceed 1000 items");
			quanS = quan.value.slice(0,0);
			document.getElementById("myNumber").value = quanS;
			document.getElementById("myNumber").focus();
			document.getElementById("myNumber").select();
			event.preventDefault();
		} 
		if(quan.value < 0){
			alert("Quantity cannot be negative");
			quanS = quan.value.slice(0,0);
			document.getElementById("myNumber").value = quanS;
			document.getElementById("myNumber").focus();
			document.getElementById("myNumber").select();
			event.preventDefault();
		}
		console.log("Item quantity:" + quan.value);
	}
	function clrPg(){
	window.location.reload();
	}
	
	function chkEmpty(){
		var tf = true;
		var iName = document.getElementById("ItemName");
		var des = document.getElementById("itemDes");
		var quan = document.getElementById("myNumber");
		
		if (iName.value == "" && tf != false){
			tf = false;
			alert("Box(s) is empty cannot proceed");
			document.getElementById("ItemName").focus();
			document.getElementById("ItemName").select();
		}else if(des.value == "" && tf != false){
			alert("Box(s) is empty cannot proceed");
			tf = false;
			document.getElementById("itemDes").focus();
			document.getElementById("itemDes").select();
		}else if(quan.value == "" && tf != false){
			alert("Box(s) is empty cannot proceed");
			tf = false;
			document.getElementById("myNumber").focus();
			document.getElementById("myNumber").select();
		}else if(quan.value < 0){
			alert("Quantity cannot be negative");
			quanS = quan.value.slice(0,0);
			document.getElementById("myNumber").value = quanS;
			document.getElementById("myNumber").focus();
			document.getElementById("myNumber").select();
			event.preventDefault();
		}else if(quan.value > 1000){
			alert("Quantity cannot exceed 1000 items");
			quanS = quan.value.slice(0,0);
			document.getElementById("myNumber").value = quanS;
			document.getElementById("myNumber").focus();
			document.getElementById("myNumber").select();
			event.preventDefault();
		} else{
			var params;
			
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "addItems.php", true);
			
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			
			 xhr.onreadystatechange = function () {
			 if (xhr.readyState == 4 && xhr.status == 200) {
				var result = xhr.responseText;
				alert(result);
				console.log(result);
				if(result.match(/Item Inserted!/g)){
					window.open('addInventory.html', '_self');
				}
				
				}
			}
			 console.log("user = " + user);
			 
			 //removes html from textboxes
			 iName.value = iName.value.replace(/<[^>]*>/g, "").replace(/'/g, "''");
			 des.value = des.value.replace(/<[^>]*>/g, "").replace(/'/g, "''");
			 quan.value = quan.value.replace(/<[^>]*>/g, "").replace(/'/g, "''");
			 //alert("No no");
			 
			 params = "iName="+iName.value+"&des="+des.value+"&quan="+quan.value+"&user="+user;
			 console.log(params);
			 xhr.send(params);
			
		}
		
		return tf;
		
	}
	