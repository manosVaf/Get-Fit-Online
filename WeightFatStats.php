<?php
	session_start();
	$username = $_SESSION["loggedin"];
	
	mysqli_report(MYSQLI_REPORT_STRICT);
	include 'DBconnect.php'; 
	
	/* check connection */
	$stmt = $mysqli->prepare('select measure_date, weight, fat_percentage 
								from measure 
									where measure.Client_Username = ? and YEAR(current_date()) - YEAR(measure.measure_date) <= 1
										order by measure_date asc');
	$stmt->bind_param('s', $username);


	/* execute prepared statement*/
	$exists = False;
	if (!$stmt->execute()) {
		echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	}

$result = $stmt->get_result();
$measures = array();

while ($product = $result->fetch_assoc()) {
   $measures[] = $product;
}

$stmt->close();
$result->free();
$mysqli->close();

print json_encode($measures);

?>