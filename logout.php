<?php
	session_start();
	if( isset( $_SESSION['loggedin'] ) ) {
		session_destroy();
		header("Location: http://localhost:81/gfo/main.html");
		exit;
	}
?>