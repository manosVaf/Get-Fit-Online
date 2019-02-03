<?php

include 'DBconnect.php'; 

if ($mysqli->connect_errno) {
    
    echo "Sorry, this website is experiencing problems.";
    exit;
}

// Perform an SQL query
$sql = "select product.Name, product.Price, product.Description, x.purchases, y.rate
			from product 
            left outer join  (select rate.Product_Productid as rate_pid, sum(rate.Rate)/count(rate.Product_Productid) as rate
							from rate 
								group by rate.Product_Productid) as y on y.rate_pid = product.Productid 
                left outer join (select purchase_product.Product_Productid as purchase_pid, sum(purchase_product.Quantity) as purchases
							from purchase_product
								group by purchase_product.Product_Productid) as x on product.Productid = x.purchase_pid
					group by product.Productid";
if (!$result = $mysqli->query($sql)) {
    echo "Sorry, the website is experiencing problems.";
    exit;
}


if ($result->num_rows === 0) {
    echo "We could not find a match , sorry about that. Please try again.";
    exit;
}

$rows = array();

while ($product = $result->fetch_assoc()) {
   $rows[] = $product;
}
echo json_encode($rows);

// The script will automatically free the result and close the MySQL
// connection when it exits, but let's just do it anyways
$result->free();
$mysqli->close();
?>
