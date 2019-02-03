<?php
	session_start();
	mysqli_report(MYSQLI_REPORT_STRICT);
	include 'DBconnect.php';	
	
	//search  last id 
	$stmt = $mysqli->prepare('SELECT Purchaseid FROM Purchase ORDER BY Purchaseid DESC LIMIT 1');

	
	/* execute prepared statement */
	if (!$stmt->execute()) {
		 echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	}
	$result = $stmt->get_result();
	$purchaseid= array_values($result -> fetch_assoc())[0]+1;
	
	
	
	$user = $_POST["username"];
	$productname = $_POST["productname"];
	$quantity = $_POST["quantity"];
	
	
	$sql = "INSERT INTO Purchase (firstname, lastname, email)
	VALUES ('John', 'Doe', 'john@example.com')";

	
	//insert purchase
	$date= date("Y-m-d H:i:s");

	$sql = "INSERT INTO Purchase (Purchaseid, PuchaseDate, Client_Username)
	VALUES (" .$purchaseid .", now(), '".$user."');";
	
	echo PHP_EOL;
	if ($mysqli->query($sql) === TRUE) {
		//search products with productname
		$stmt = $mysqli->prepare('SELECT Productid FROM Product WHERE Name = ?');
		$stmt->bind_param('s', $productname);
		if (!$stmt->execute()) {
			echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
		}	
		$result = $stmt->get_result();
		$productId=	array_values($result->fetch_assoc())[0];
	
	
		//insert purchase_product
	
		$sql = "INSERT INTO Purchase_Product (Purchase_Purchaseid, Product_Productid, Quantity)
		VALUES (" .$purchaseid .", '".$productId."', '".$quantity."');";
	
		echo PHP_EOL;
		if ($mysqli->query($sql) === TRUE) {
			echo '<div style = "font-size: 30px;">';
			echo "Your purchase submited succesfully!!!</br>The next time you will visit our gym you will take the product!!</br>";
			echo 'Please Click <a href = "http://localhost:81/gfo/Profile.html">here</a> to go back!</br>';
			echo '</div>';
		} else {
			echo "Error: " . $sql . "<br>" . $mysqli->error;
		}
	
		$stmt->close();
	
	} else {
		echo "Error: " . $sql . "<br>" . $mysqli->error;
	}
	
	

	
	
?>