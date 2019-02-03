<?php
	session_start();
	$username = $_SESSION["loggedin"];
	mysqli_report(MYSQLI_REPORT_STRICT);
	include 'DBconnect.php'; 
	
	/* check connection */
	$stmt = $mysqli->prepare('select plan.PlanName as planname, part.Description as partdesc, part.Ex_Rest as exerest, exercise.Name as exename, exercise_part.Sets as sets, exercise_part.Reps as reps, exercise_part.Set_Rest as setrest, 
								exercise_part.Duration as duration, plan.Employee_Username as plancreator
								from exercise
										inner join exercise_part on exercise_part.Exercise_Exerciseid = Exercise.Exerciseid
										inner join Part on exercise_part.Part_PartId = Part.PartId
										inner join Plan on Part.Plan_PlanId = Plan.PlanId
										inner join Client on Plan.Goal_Goalid = Client.Goal_Goalid
										inner join (select client.Username as username from client where client.Username = ?) as x on client.Username = x.username
									order by Part.PartId');
	$stmt->bind_param('s', $username);


	/* execute prepared statement*/
	$exists = False;
	if (!$stmt->execute()) {
		echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	}

	$result = $stmt->get_result();
	$plans = array();
	
	while ($plan = $result->fetch_assoc()) {
		$plans[] = $plan;
	}
	
	$stmt->close();
	$result->free();
	$mysqli->close();

	print json_encode($plans);
?>