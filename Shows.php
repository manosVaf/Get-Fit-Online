<?php
	session_start();
	$username = $_SESSION["loggedin"];
	
	mysqli_report(MYSQLI_REPORT_STRICT);
	include 'DBconnect.php'; 
	
	/* check connection */
	$stmt = $mysqli->prepare('select date(visitDate) as visit from visit  where Client_Username= ? and date(visitDate) > DATE_SUB(date(NOW()), INTERVAL 1 WEEK ) group by day(visitDate)');
	$stmt->bind_param('s', $username);


	/* execute prepared statement*/
	$exists = False;
	if (!$stmt->execute()) {
		echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	}

	$result = $stmt->get_result();
	$shows = array();
	
	while ($show = $result->fetch_assoc()) {
		$shows[] = $show;
	}
	
	$start  = new DateTime('-7 days');
	$period = new DatePeriod($start, new DateInterval('P1D'), 6);
	$dates = array();
	foreach ($period as $date) {
		$date = $date->format('Y-m-d');
		$dates[] = array('date' => $date, 'show' => 0);
	}
	
	
	for($i = 0; $i < count($shows); $i++) {
		for($j = 0; $j < count($dates); $j++) {
			if($shows[$i]["visit"] == $dates[$j]["date"]){
				$dates[$j]["show"] = 1;
			}
		}
	}
	$stmt->close();
	$result->free();
	$mysqli->close();

	print json_encode($dates);

?>