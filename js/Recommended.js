$(document).ready(function(){
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			var plans = JSON.parse(this.responseText);
			showRecommended(plans);
       }
    };
    xhttp.open("GET", "http://localhost:81/gfo/recommendedplans.php", true);					//CALL FOR RECOMMENDED
	xhttp.send(); 
});

function createPlan(planname, plancreator) {
  var obj = {};
  obj.planname = planname;
  obj.plancreator = plancreator;
  obj.parts = [];
  return obj;
}

function createPart(partdesc, exerest){
	var obj = {};
	obj.partdesc = partdesc;
	obj.exerest = exerest;
	obj.exes = [];
	return obj;
}

function createExercise(exename, sets, reps, setrest,duration){
	var obj = {};
	obj.exename = exename;
	obj.sets = sets;
	obj.reps = reps;
	obj.setrest = setrest;
	obj.duration = duration;
	return obj;
}

function showRecommended(plans){
	var reco = [];
	for(var i in plans){
		if(i == 0){
			reco.push(createPlan(plans[i].planname, plans[i].plancreator));
			reco[0].parts.push(createPart(plans[0].partdesc, plans[0].exerest));
			reco[0].parts[0].exes.push(createExercise(plans[0].exename, plans[0].sets, plans[0].reps,
													plans[0].setrest, plans[0].duration));
													//alert(reco[0].parts[0].exes[0].exename);
			continue;
		}
		for(var j in reco){
			if(plans[i].planname !== reco[j].planname){			// den uparxei to plan
				reco.push(createPlan(plans[i].planname, plans[i].plancreator));
				reco[reco.length].parts.push(createPart(plans[i].partdesc, plans[i].exerest));
				reco[reco.length].parts[reco[reco.length ].parts.length ].exes.push(createExercise(plans[i].exename, plans[i].sets, plans[i].reps,
													plans[i].setrest, plans[i].duration));
													break;
				
			}else{				//uparxei to plan
				for(var k in reco[j].parts){
					if(reco[j].parts[k].partdesc !== plans[i].partdesc){		//uparxei to plan, oxi to part
						var newl = reco[j].parts.push(createPart(plans[i].partdesc, plans[i].exerest));
						reco[j].parts[newl - 1].exes.push(createExercise(plans[i].exename, plans[i].sets, plans[i].reps,
													plans[i].setrest, plans[i].duration));
						break;
					}else{											//uparxei to plan, part
						for(var m in reco[j].parts[k].exes){
							if(reco[j].parts[k].exes[m].exename !== plans[i].exename){	//uparxei plan, part oxi exe
								reco[j].parts[k].exes.push(createExercise(plans[i].exename, plans[i].sets, plans[i].reps,
													plans[i].setrest, plans[i].duration));
													break;
							}
						}
					}
				}
			}
		}
	} 	
		

	
	for(var i in reco){
		var html = "<h3>Plan Name: " + reco[i].planname + "</h3>";
		for(var j in reco[i].parts){
			var html = "<p>part name " + reco[i].parts[j].partdesc + "</p>";
			for(var m in reco[i].parts[j].exes){
				var html = "<p><p>exe name " + reco[i].parts[j].exes[m].exename + "</p></p>";
			}
		}
	}
	
}


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

function showpic(a){
	var pic = document.getElementById("picexercise");
	pic.src = "Images/" + a.id + ".jpg";
	document.getElementById("rememberexe").innerHTML = a.id;
}