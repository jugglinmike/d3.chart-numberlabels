(function() {
	"use strict";

	var myChart = d3.select("#basic-example").append("svg").append("g")
		.chart("NumberLabels");
	myChart.base.attr("transform", "translate(20, 20)");

	var data = [];
	var drawRandom = function(chart) {
		var data = [];
		var i = 4 + Math.floor(Math.random() * 3);
		while (i--) {
			data.push(Math.ceil(Math.random() * 100) / 10);
		}
		chart.draw(data);
	};

	myChart.duration = 900;
	myChart.draw([1, 2, 3, 4]);
	setInterval(drawRandom.bind(this, myChart), 2000);

	var data = [];
	var i = 4;
	while(i--) {
		data.push({ time: i, value: Math.random() * 40 });
	}
	var drawRandom2 = function(chart) {
		data.forEach(function(data) {
			data.value = Math.random() * 100 + 20;
		});
		chart.draw(data);
	};

	var myChart2 = d3.select("#bar-chart-example").append("svg").append("g")
		.chart("BarChart");
	var nums = myChart2.mixin("NumberLabels", myChart2.base.append("g"));
	nums.transform = function(d) {
		return d.map(function(d) { return d.value; });
	};
	var labels = nums.layer("labels");
	labels.on("enter", function() {
		this.attr("x", function(d, i) { return myChart2.width()*i/4 + myChart2.width()/8; });
	});
	labels.on("merge:transition", function() {
		this.attr("y", function(d) { return d + 20; });
	});
	var bars = myChart2.layer("bars");
	bars.attr("transform", "translate(-" +myChart2.width()/4+")");
	bars.on("enter", function() {
		this.attr("y", 0);
	});
	bars.on("merge:transition", function() {
		this.duration(1000);
		this.attr("height", function(d) { return d.value; })
	});

	setInterval(drawRandom2.bind(this, myChart2), 1200);

	setInterval(function() {
		d3.timer.flush(); // avoid memory leak when in background tab
	}, 1200);
}());
