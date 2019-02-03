<?php

include 'DBconnect.php'; 

if ($mysqli->connect_errno) {
    
    echo "Sorry, this website is experiencing problems.";
    exit;
}

// Perform an SQL query
$sql = "select (count(distinct visit.Client_Username)/100)*100 as percentage, count(distinct visit.Client_Username) as active, 100 as totalfit
			from visit
				where TIMESTAMPDIFF(MINUTE,visit.visitDate,NOW())  < 45";
if (!$result = $mysqli->query($sql)) {
    echo "Sorry, the website is experiencing problems.";
    exit;
}


$rows = $result->fetch_assoc();
echo json_encode($rows);

$result->free();
$mysqli->close();
?>
