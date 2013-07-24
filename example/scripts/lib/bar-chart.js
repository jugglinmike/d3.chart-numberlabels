d3.chart("BarChart", {

	dataAttrs: ['value', 'time'],

	initialize: function(options) {

		options = options || {};

		var chart = this;

		this.x = d3.scale.linear();

		this.y = d3.scale.linear()
			.domain([0, 100]);

		this.base.attr("class", "bar-chart");

		this.layer("bars", this.base.append("g"), {
			dataBind: function(data) {
				return this.selectAll("rect")
					.data(data, function(d) { return d.time; });
			},
			insert: function() {
				return this.append("rect");
			},
			events: {
				enter: function() {
					var length = this.data().length;
					this.attr("x", function(d, i) { return chart.x(i + 1) - .5; })
						.attr("y", function(d) { return chart.h - chart.y(d.value) - .5; })
						.attr("width", chart.width() / length)
						.attr("height", function(d) { return chart.y(d.value); });
				},
				"enter:transition": function() {
					this.duration(1000)
						.attr("x", function(d, i) { return chart.x(i) - .5; });
				},
				"update:trasition": function() {
					this.duration(1000)
						.attr("x", function(d, i) { return chart.x(i) - .5; });
				}
			},
			"exit:transition": function() {
				this.duration(1000)
					.attr("x", function(d, i) { return chart.x(i - 1) - .5; })
					.remove();
			}
		});

		this.width(options.width || 600);
		this.height(options.height || 80);

	},

	width: function(newWidth) {
		if (!arguments.length) {
			return this.w;
		}
		this.w = newWidth;
		this.x.range([0, this.w]);
		this.base.attr("width", this.w);
		return this;
	},

	height: function(newHeight) {
		if (!arguments.length) {
			return this.h;
		}
		this.h = newHeight;
		this.y.rangeRound([0, this.h]);
		this.base.attr("height", this.h);
		return this;
	},

	transform: function(data) {
		this.x.domain([0, data.length]);
		return data;
	}

});
