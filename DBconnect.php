<?php
	mysqli_report(MYSQLI_REPORT_STRICT);
	try {
		$mysqli = new mysqli('gfo') ;
	} catch (Exception $e ) {
		echo '<div style = "font-size: 25px;">';
		echo "Service unavailable</br>";
		echo "We are sorry </br>";  
		echo 'Please Click <a href = "http://localhost:81/gfo/Main.html">here</a> to try again!</br>';
		echo '</div>';
		exit;
	}

?>
