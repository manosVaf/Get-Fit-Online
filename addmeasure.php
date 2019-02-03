<?php 
	session_start(); 
	$username = $_SESSION["loggedin"]; 
	$weight = $_GET["weight"];
	$fat = $_GET["fat"];

	include 'DBconnect.php'; 
	$stmt = $mysqli->prepare('insert into measure values(now(),'.$weight.','.$fat.',?)');
	$stmt->bind_param('s', $username);

	/* execute prepared statement*/
	if (!$stmt->execute()) {
		 echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	}
	
	echo "Your measure submitted succesfully";
?>