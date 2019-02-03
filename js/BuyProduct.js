$(document).ready(function(){
	var data = localStorage["data"];
	var productinfo = data.split(",");
	document.getElementById("productname").value = productinfo[0];
	document.getElementById("productdesc").value = productinfo[2];
	document.getElementById("productprice").value = productinfo[1];
	document.getElementById("productpurchases").value = productinfo[3];
	document.getElementById("productrate").value = productinfo[4];
});

$(document).ready(function(){
	$("#purchase").click(function(){
		var qua = $("#quantity").val();
		while(!($.isNumeric(qua))){
			qua = prompt("Please give a number for quantity");				
		}
		document.getElementById("quantity").value = qua;
	});
});