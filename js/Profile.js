$(document).ready(function(){	
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var traffic = JSON.parse(this.responseText);
			showTraffic(traffic);
       }
    };
    xhttp.open("GET", "http://localhost:81/gfo/showtraffic.php", true);				//CALL FOR TRAFFIC
	xhttp.send(); 
});

$(document).ready(function(){
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var measures = JSON.parse(this.responseText);
			showBodyStats(measures);
       }
    };
    xhttp.open("GET", "http://localhost:81/gfo/WeightFatStats.php", true);			//CALL FOR WEIGHT STAT
	xhttp.send(); 
});

$(document).ready(function(){
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var measures = JSON.parse(this.responseText);
			showShows(measures);
       }
    };
    xhttp.open("GET", "http://localhost:81/gfo/Shows.php", true);					//CALL FOR SHOW STAT
	xhttp.send(); 
});

$(document).ready(function(){
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var products = JSON.parse(this.responseText);
			createRows(products);  
       }
    };
    xhttp.open("GET", "http://localhost:81/gfo/products.php", true);				//CALL FOR PRODUCTS
	xhttp.send(); 
});

(function($, window) {
  var Starrr;

  Starrr = (function() {
    Starrr.prototype.defaults = {
      rating: void 0,
      numStars: 5,
      change: function(e, value) {}
    };

    function Starrr($el, options) {
      var i, _, _ref,
        _this = this;

      this.options = $.extend({}, this.defaults, options);
      this.$el = $el;
      _ref = this.defaults;
      for (i in _ref) {
        _ = _ref[i];
        if (this.$el.data(i) != null) {
          this.options[i] = this.$el.data(i);
        }
      }
      this.createStars();
      this.syncRating();
      this.$el.on('mouseover.starrr', 'span', function(e) {
        return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('mouseout.starrr', function() {
        return _this.syncRating();
      });
      this.$el.on('click.starrr', 'span', function(e) {
        return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
      });
      this.$el.on('starrr:change', this.options.change);
    }

    Starrr.prototype.createStars = function() {
      var _i, _ref, _results;

      _results = [];
      for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        _results.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
      }
      return _results;
    };

    Starrr.prototype.setRating = function(rating) {
      if (this.options.rating === rating) {
        rating = void 0;
      }
      this.options.rating = rating;
      this.syncRating();
      return this.$el.trigger('starrr:change', rating);
    };

    Starrr.prototype.syncRating = function(rating) {
      var i, _i, _j, _ref;

      rating || (rating = this.options.rating);
      if (rating) {
        for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
        }
      }
      if (rating && rating < 5) {
        for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
          this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
        }
      }
      if (!rating) {
        return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
      }
    };

    return Starrr;

  })();
  return $.fn.extend({
    starrr: function() {
      var args, option;

      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var data;

        data = $(this).data('star-rating');
        if (!data) {
          $(this).data('star-rating', (data = new Starrr($(this), option)));
        }
        if (typeof option === 'string') {
          return data[option].apply(data, args);
        }
      });
    }
  });
})(window.jQuery, window);

$(function() {
  return $(".starrr").starrr();
});

$( document ).ready(function() {
  $('#stars').on('starrr:change', function(e, value){
    $('#count').html(value);
  });
  
  $('#stars-existing').on('starrr:change', function(e, value){
    $('#count-existing').html(value);
  });
});

$(document).ready(function(){
	var table = document.getElementsByTagName("table")[0];
	var tbody = table.getElementsByTagName("tbody")[0];
	tbody.onclick = function (e) {
		e = e || window.event;
		var data = [];
		var target = e.srcElement || e.target;
		while (target && target.nodeName !== "TR") {
			target = target.parentNode;
		}
		if (target) {
			var cells = target.getElementsByTagName("td");
			for (var i = 0; i < cells.length; i++) {
				data.push(cells[i].innerHTML);
			}
		}
    localStorage["data"] = data;
	window.location.href = "http://localhost:81/gfo/Buyproduct.php";
	};
	
});

$(document).ready(function(){
	$("#formmeasure").hide();
	$("#addmeasure").click(function(){
		$("#addmeasure").hide(500);
		document.getElementById("measweight").value = "";
		document.getElementById("measfat").value = "";
		$("#formmeasure").show(1000);	
	});
	
	$("#addmeasure1").click(function(){
		var weight = $("#measweight").val();
		var fat = $("#measfat").val();
		while(!$.isNumeric(weight)){
			weight = prompt("Please give a number for weight!");
		}
		while(!$.isNumeric(fat)){
			fat = prompt("Please give a number for fat!");
		}
		sendMeasure(weight, fat);
	});
});

$(document).ready(function(){
	$("#showbuyoption").hide();
	$("#productinfo").on({
		mouseenter: function(){
			$("#showbuyoption").show(500);	
		},
		mouseleave: function(){
			$("#showbuyoption").hide(500);
		}
	});
});

$(document).ready(function(){
	$("#exinfo").hide();
	$("#exeinfo").on({
		mouseenter: function(){
			$("#exinfo").show(1000);	
		},
		mouseleave: function(){
			$("#exinfo").hide(1000);
		}
	});
});

$(document).ready(function(){
	$("#benchpress").click(function(){
		showpic(this);
	});
	
	$("#flyes").click(function(){
		showpic(this);
	});
	
	$("#inclinedumbell").click(function(){
		showpic(this);
	});
	
	$("#bentoverrow").click(function(){
		showpic(this);
	});
	
	$("#tbarrow").click(function(){
		showpic(this);
	});
	
	$("#triceppushdown").click(function(){
		showpic(this);
	});
	
	$("#shrugs").click(function(){
		showpic(this);
	});
	
	$("#romaniandeadlift").click(function(){
		showpic(this);
	});
	
	$("#deadlift").click(function(){
		showpic(this);
	});
	
	$("#pullups").click(function(){
		showpic(this);
	});
	
	$("#latteralraise").click(function(){
		showpic(this);
	});
	
	$("#onearmdumbell").click(function(){
		showpic(this);
	});
	
	$("#shoulderpress").click(function(){
		showpic(this);
	});
	
	$("#squats").click(function(){
		showpic(this);
	});
	
	$("#triceppushdown").click(function(){
		showpic(this);
	});
	
	$("#skullcrushers").click(function(){
		showpic(this);
	});
	
	$("#preachercurls").click(function(){
		showpic(this);
	});
	
	$("#hammercurls").click(function(){
		showpic(this);
	});
	
	$("#bicepcurls").click(function(){
		showpic(this);
	});
	
	$("#legextensions").click(function(){
		showpic(this);
	});

	$("#legraises").click(function(){
		showpic(this);
	});

	$("#legcurls").click(function(){
		showpic(this);
	});

	$("#lunges").click(function(){
		showpic(this);
	});

	$("#calfraises").click(function(){
		showpic(this);
	});	
	
	$("#legpress").click(function(){
		showpic(this);
	});
});

$(document).ready(function(){
	document.getElementById("rememberexe").innerHTML = "";
	document.getElementById("exeweight").value = "";
	document.getElementById("exereps").value = "";
	document.getElementById("exsets").value = "";
	$("#submitexesucc").hide();
	$("#submitall").hide();
	$("#submitexe").click(function(){
		var exercise = document.getElementById("rememberexe").innerHTML;
		var sets = document.getElementById("exsets").value;
		var weight = document.getElementById("exeweight").value;
		var reps = document.getElementById("exereps").value;
		if(exercise == ""){
			alert("No exercise chosen! \nFirst choose an exercise.. Compare and be sure that you chose corrent\nThen fill sets, reps, weight and submit you exersice!\n\n");
		}else if(sets == ""){
			alert("No sets given! Fill sets, reps, weight and then submit you exersice!\n\n");
		}else if(reps == ""){
			alert("No reps given! Fill reps, weight and then submit you exersice!\n\n");
		}else if(weight == ""){
			alert("No weight given! Fill weight and then submit you exersice!\n\n");
		}else{
			$('html, body').animate({
				scrollTop: $("#picexercise").offset().top
			}, 1500);
			$("#submitexesucc").show(1400);
			setTimeout(function() { 
			$("#submitexesucc").hide(500); 
			$("#submitall").show(1000);
			var html = "<li id = '" + document.getElementById(exercise) + "'>"  + " Exercise: " + document.getElementById(exercise).innerHTML +  " Sets" + sets + " Reps: " + reps + " Weight: " + weight + "</li>";
			$("#checkedexes").append(html);
			
			}, 3000);
			
			document.getElementById("rememberexe").innerHTML = "";
			document.getElementById("exeweight").value = "";
			document.getElementById("exereps").value = "";
			document.getElementById("exsets").value = "";
		}
	});
});

$(document).ready(function(){
	$("#submitall").click(function(){	
		alert("Your exercises submitted succesfully!!");
		window.location.href = "http://localhost:81/gfo/Profile.html";
	});
});

$(document).ready(function(){
	$("#clearStat").hide();
	$(".stats").click(function(){
		getExeStat((this.className).split(" ")[1]);
		$("#clearStat").show(1000);
	});
});

$(document).ready(function(){
	$("#clearStat").click(function(){
		var ctx = document.getElementById('exeStat').getContext('2d');
		ctx.clearRect(0, 0, document.getElementById('exeStat').width, document.getElementById('exeStat').height);
		$("#buttStat").show(1000);
		$("#clearStat").hide(1000)
	});
});

function createRows(prod){
	var tbl = document.getElementById("products");
	for(var i = 0; i< prod.length; i++){
		var row = tbl.insertRow(i+1);
		row.className = 'tableproducts';
		var cellname = row.insertCell(0);
		var cellprice = row.insertCell(1);
		var celldesc = row.insertCell(2);
		var cellpurchase = row.insertCell(3);
		var cellrate = row.insertCell(4);
	
		cellname.innerHTML = prod[i].Name;
		cellprice.innerHTML = prod[i].Price; 
		celldesc.innerHTML = prod[i].Description; 
		if(prod[i].purchases == null){
			cellpurchase.innerHTML = "";
		}else{
			cellpurchase.innerHTML = prod[i].purchases;
		}
		if(prod[i].rate == null){
			cellrate.innerHTML = "";
		}else{
			cellrate.innerHTML = parseInt(prod[i].rate).toFixed(1);
			
		}
	}
}

function showpic(a){
	var pic = document.getElementById("picexercise");
	pic.src = "Images/" + a.id + ".jpg";
	document.getElementById("rememberexe").innerHTML = a.id;
}

function showShows(measures){
	var dates = [];
	var shows = [];
	for(var i in measures){
		dates.push(measures[i].date);
		shows.push(measures[i].show);
	}
	
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	for(var j in dates){
		var d = new Date(dates[j]);
		var dayName = days[d.getDay()];
		dates[j] = dayName;
	}
	
	var ctx = document.getElementById('preWeek').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: dates,
			datasets: [
			{
				label: "Previous Weeks Shows",
				fill: false,
				lineTension: 0.0,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: shows,
				spanGaps: true,
			}
			]
		},
		options: {
			scales: {
				yAxes: [{
					display: false
				}]
			}
		}
	});
}

function getExeStat(exeid){
	$.ajax({
		url: "http://localhost:81/gfo/getExeStat.php",
		type: "get", 
		data: { 
			exercise: exeid
		},
		success: function(response) {
			$("#buttStat").hide(1000);
			showExeStat(exeid, JSON.parse(response));
		},
		error: function(xhr) {
			alert("Something went wrong");
		}
	});
}

function sendMeasure(weight, fat){
	$.ajax({	
		url: "http://localhost:81/gfo/addmeasure.php",
		type: "get", 
		data: { 
			weight: weight, 
			fat: fat
		},
		success: function(response) {
			alert(response);
			window.location.href = "http://localhost:81/GFO/Profile.html";
		},
		error: function(xhr) {
			alert("Something went wrong");
		}
	});
}

function showExeStat(exeid, weig){
	var weights = [];
	var dates = [];
	var exe = document.getElementById(exeid).innerHTML;
	for(var i in weig){
		dates.push((weig[i].date).split(" ")[0]);
		weights.push(weig[i].weight);
	}
	
	var ctx = document.getElementById('exeStat').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: dates,
			datasets: [
			{
				label: exe + " Weigth Stat",
				fill: false,
				lineTension: 0.0,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',	
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: weights,
				spanGaps: true,
			}
			]
		},
		options: {
			scales: {
				yAxes: [{
					display: false
				}]
			}
		}
	});
	
	$("#clearStat").show(1000);
}

function showTraffic(traffic){
	var percentage = Math.floor(traffic.percentage);
	var active = traffic.active;
	var total = traffic.totalfit;
	if(percentage < 50){
		$("#trafficbutton").css("background-color", "green");
	}else if(percentage >= 50 && percentage < 70){
		$("#trafficbutton").css("background-color", "orange");
	}else{
		$("#trafficbutton").css("background-color", "red");
	}
	document.getElementById("trafficinfo").innerHTML = "Gym's maximum capacity: " + total + "</br>Gym's currently active: " + active;
}

function showBodyStats(measures){
	var dates = [];
	var weights = [];
	var fat_percentages = [];
	for(var i in measures){
		dates.push((measures[i].measure_date).split(" ")[0]);
		weights.push(measures[i].weight);
		fat_percentages.push(measures[i].fat_percentage);
	}
	
	var ctx = document.getElementById('weightstat').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: dates,
			datasets: [
			{
				label: "Weigth Stat",
				fill: false,
				lineTension: 0.0,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: weights,
				spanGaps: true,
			}
			]
		},
		options: {
			scales: {
				yAxes: [{
					display: false
				}]
			}
		}
	});
	
	var ctx = document.getElementById('fatiguestat').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: dates,
			datasets: [
			{
				label: "Fat Stat",
				fill: false,
				lineTension: 0.0,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: fat_percentages,
				spanGaps: true,
			}
			]
		},
		options: {
			scales: {
				yAxes: [{
					display: false
				}]
			}
		}
	});
}
