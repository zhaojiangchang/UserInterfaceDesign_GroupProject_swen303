var team_name = Array("Central Pulse,New Zealand",
		"Northern Mystics,New Zealand",
		"Waikato Bay of Plenty Magic,New Zealand",
		"Southern Steel,New Zealand",
		"Canterbury Tactix,New Zealand",
		"New South Wales Swifts,Australia",
		"Adelaide Thunderbirds,Australia",
		"Melbourne Vixens,Australia",
		"West Coast Fever,Australia",
"Queensland Firebirds,Australia");


var team_win = new Array();

function init_team_win() {
	var i = 0;
	for(i = 0; i < team_name.length; i++){
		var name = team_name[i].slice(0, team_name_list[i].indexOf(","));
		team_win[i] = new team_name_win(name);
	}
}

function team_name_win(name){
	this.name = name;
	this.win_information = new Array();
}

function win_info(year, home_name, home_percentage, away_name, away_percentage){
	this.year = year;
	this.home_name = home_name;
	this.home_percentage = home_percentage;
	this.away_name = away_name;
	this.away_percentage = away_percentage;
}

function team_win_info(){
	init_team_win();
	var i = 0;
	for (i = 0; i < years_teams.length; i++){
		var year = years_teams[i].year;
		var index = 0;
		for (index = 0; index < years_teams[i].teams.length; index++){
			var team_name = years_teams[i].teams[index].name;
			var home_win =  years_teams[i].teams[index].home.win_percentage;
			var away_win =  years_teams[i].teams[index].away.win_percentage;
//			console.log("##########")
//			console.log("home:" + home_win);
//			console.log("away:" + away_win);

			var j = 0;
			for (j = 0; j < team_win.length; j++){
				if (team_name == team_win[j].name){
					team_win[j].win_information.push(new win_info(year, "Home Win", home_win, "Away Win", away_win));
				}
			}
		}
	}
}


function drawStackedBarchart(d){
	var da;
	var index = 0;
	for (index = 0; index < team_win.length; index++){
		if (team_win[index].name == d){
			da = team_win[index].win_information;
			break;
		}
	}
	var sample_data = [];

	for(var h in da){
		var item = da[h];

		sample_data.push({
			"year": item.year,
			"name": item.home_name,
			"percentage": item.home_percentage,
		});

		sample_data.push({
			"year": item.year,
			"name": item.away_name,
			"percentage": item.away_percentage,
		});
	}

	var visualization = d3plus.viz()
	.container("#stackedBarchart")  // container DIV to hold the visualization
	.data(sample_data)  // data to use with the visualization
	.type("bar")    // visualization type
	.id("name")         // key for which our data is unique on
	.x({"stacked": true, "value": "percentage"})         // key for x-axis
	.y("year")        // key for y-axis
	.time("year")
	.draw()             // finally, draw the visualization!

};
