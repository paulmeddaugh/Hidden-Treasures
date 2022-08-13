<?php

  $user = $_POST["idUser"];
  $moneyToAdd = $_POST["moneyToAdd"];
  
  // Connect to MySQL
  	$db = mysqli_connect("localhost", "root", "", "semp");
	if (mysqli_connect_errno()) {
		print "Connect failed: " . mysqli_connect_error();
		exit();
	}
	
	// Submit the query to add to user balance
	$query = "UPDATE semp.User
			  SET 
				 curBal = curBal + $moneyToAdd
			  WHERE
				idUser = $user;";
	
	$result = mysqli_query($db, $query);
	$db->close();
	
	if (!$result) {
		print "Error - The money could not be added to your account." .
		mysqli_error();
		exit;
	} else {
		print "Money added!";
		return true;
	}
	
	mysqli_close($db);
?>