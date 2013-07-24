d3.chart("NumberLabels", {
	labelElem: "text",
	duration: 1000,

	initialize: function() {
		this.base.classed("number-labels", true);
		this.layer("labels", this.base, {
			dataBind: function(data) {
				return this.selectAll(".number-label")
					.data(data);
			},
			insert: function() {
				return this.append("text")
					.classed("number-label", true);
			},
			events: {
				enter: function() {
					this.text(0)
						.style("text-anchor", "middle")
						.attr("x", function(d, i) { return i * 30; });
				},
				"merge:transition": function() {
					var chart = this.chart();
					this.duration(chart.duration)
					this.tween("text", function(d) {
						var i = d3.interpolate(this.textContent, d);
						return function(t) {
							this.textContent =
								(Math.floor(i(t) * 10) / 10).toFixed(1);
						};
					});
				},
				"exit:transition": function() {
					var chart = this.chart();
					this.duration(chart.duration)
						.text(0)
						.tween("text", function() {
							var i = d3.interpolate(this.textContent, 0);
							return function(t) {
								this.textContent =
									(Math.floor(i(t) * 10) / 10).toFixed(1);
							};
						})
						.remove();
				}
			}
		});
	}

});
