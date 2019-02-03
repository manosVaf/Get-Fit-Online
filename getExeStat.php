<?php

	session_start();
	$username = $_SESSION["loggedin"];
	$exercise = $_GET["exercise"];
	
	mysqli_report(MYSQLI_REPORT_STRICT);
	include 'DBconnect.php'; 
	
	/* check connection */
	$stmt = $mysqli->prepare('select weight, ExerciseDate as date
	from client_exercise, (select Exerciseid as id from exercise where Name = ?) as exe
		where Client_Username = ? and Exercise_Exerciseid = exe.id');
	$stmt->bind_param('ss', $exercise, $username);


	/* execute prepared statement*/
	$exists = False;
	if (!$stmt->execute()) {
		echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	}

	$result = $stmt->get_result();
	$stats = array();

	while ($stat = $result->fetch_assoc()) {
		$stats[] = $stat;
	}

	$stmt->close();
	$result->free();
	$mysqli->close();

	print json_encode($stats);

?>