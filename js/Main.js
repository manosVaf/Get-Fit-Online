var ctx = mycanvas.getContext('2d');
var width = window.innerWidth;
var mygradient = ctx.createLinearGradient(0, 0, 0, 100);
mygradient.addColorStop(0, '#1a75ff');
mygradient.addColorStop(1, '#99c2ff');
ctx.fillStyle = mygradient;
ctx.fillRect(0, 0, width, 100);


var __slice = [].slice;

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

function fade(element) {
    var op = 1; 	
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
			writeMob(element.id);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);	
}


function writeMob(x){	
	var sibling = document.getElementById(x).nextElementSibling.id;
	document.getElementById(sibling).style.visibility = "visible";
	document.getElementById(sibling).style.marginTop = "20px";
	
	var i = 4;
	var op = 0.7;
	var timer = setInterval(function() {
		document.getElementById(sibling).style.visibility = "hidden"; 
		document.getElementById(x).style = ""; 
		if (i == 0) {
			clearInterval(timer);	
		}
		document.getElementById(x).style.opacity = op;
		document.getElementById(x).style.filter = 'alpha(opacity=' + op * 100 + ")";
		op += 0.1;
		i--;
	}, 4000)
}

$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
 
      // Store hash
      var hash = this.hash;
 
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
 
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;
 
      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });
})

$(document).ready(function(){
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var products = JSON.parse(this.responseText);
			createRows(products);  
       }
    };
    xhttp.open("GET", "http://localhost:81/gfo/products.php", true);
 
	xhttp.send(); 
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
	};
});


$("#submit").on("click", function(){
	var comment = document.getElementById("comment");
	if(comment.value != ""){
		alert("Thank you");
		Scroll();
	}else{
		alert("Please write a comment!");
	}
});

function Scroll(){
	$(window).scrollTop(0);
}

