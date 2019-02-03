<?php
	session_start();
	if( isset( $_SESSION['loggedin'] ) ) {
		header("Location: http://localhost:81/gfo/Profile.html");
		exit;
	}else {
		header("Location: http://localhost:81/gfo/LogIn.html");
		exit;
	}
	
?>
