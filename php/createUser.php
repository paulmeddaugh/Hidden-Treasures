
    <?php
	  $email = $_POST["email"];
      $name = $_POST["name"];
      $usn = $_POST["usn"];
      $pwd = $_POST["pwd"];
      $rem= $_POST["rem"];
	  $bal= $_POST["bal"];
	
	  //$uid = $_GET["uid"];

	// Connect to MySQL
	$db = mysqli_connect("localhost", "root", "r23dFh5LbPNqJB", "Team4");
	if (mysqli_connect_errno()) {
		print "Connect failed: " . mysqli_connect_error();
		exit();
	}

	// Submit the query for the list of folders
	$query = "INSERT INTO Team4.User(idUser, email, name, username, pwd, reminder, curBal) VALUES (NULL, '$email', '$name', '$usn', '$pwd', '$rem', $bal)";

	$result = mysqli_query($db, $query);
	$db->close();

	if (!$result) {
		print "Username already exist/DB error" .
		mysqli_error();
		exit;
	}else{
		print "User created!";
		return true;
	}
	
	mysqli_close($db);
?>
