<!DOCTYPE html>
<html>
<head>
	<title> Get Fit Online</title>
	<meta charset="UTF-8"> 
	<link href="BootStrap/css/bootstrap.css" rel="stylesheet" />
	<link href="StyleSheets/BuyProduct.css" rel="stylesheet" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
</head>
<body>
	<div  class = "container logo">
		<img src="Images\gym.png" class="img-responsive" alt="gym img" style="margin: 0 auto; padding-top: 15px;">
	</div>
	<div  class = "text-center">
		<img class = "social" src="Images\facebook.png" class="img-responsive" alt="facebook" style="margin: 0 auto;" >
		<img class = "social" src="Images\twitter.png" class="img-responsive" alt="twitter" style="margin: 0 auto;" >
		<img class = "social" src="Images\youtube.png" class="img-responsive" alt="youtube" style="margin: 0 auto;" >
	</div>
	<div class = "container">
		<div class = "jumbotron text-center">
			<form id = "buyform" action = "http://localhost:81/GFO/submitpurchase.php" method = "post">
				<div class = "form-group">
					<div class = "row">
						<div class = "col-sm-3">
						</div>
						<div class = "col-sm-3">	
							<label>UserName:  </label>
							</br>
							<label>Product Name: </label>
							</br>
							<label>Product Description: </label>
							</br>
							<label>Product Price: </label>
							</br>
							<label>Product Purchases: </label>
							</br>
							<label>Product Rating: </label>
							</br>
							<label>Quantity: </label>
						</div>
						<div  class = "col-sm-3">
							<input type="text" name="username" value = "<?php session_start(); echo $_SESSION["loggedin"]; ?>"  readonly></input>
							</br>
							<input id = "productname" type="text" name="productname" value = "" readonly></input>
							</br>
							<input id = "productdesc" type="text" name="productdesc" value = "" readonly></input>
							</br>
							<input id = "productprice" type="text" name="productprice" value = "" readonly></input>
							</br>
							<input id = "productpurchases" type="text" name="productpurchases" value = "" readonly></input>
							</br>
							<input id = "productrate" type="text" name="productrate" value = "" readonly></input>
							</br>
							<input id = "quantity" type="text" name="quantity" value = "1"></input>
						</div>
						<div class = "col-sm-3">
						</div>
					</div>
				</div>
				</br>
				<button id = "purchase" type="submit" class="btn btn-success text-center">Purchase Product</button>
			</form>
		</div>
	</div>
	<script src="JS\BuyProduct.js"></script>
</body>
</html>