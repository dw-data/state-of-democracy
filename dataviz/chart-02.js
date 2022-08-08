function chartTwo(width, height, selector) {

	console.log("Running function chartTwo");

	// Defining color cosntants

	d3.csv("chart-02.csv")
	  .then((datapoints) => {

	  	///////////////////////
	  	/// Data processing ///
	  	///////////////////////

	  	let groups = d3.group(datapoints, d => d.v2x_regime);
	  		console.log(groups);

	    ///////////////////////////////////////////
	    //// Dimensions, scales and generators ////
	    ///////////////////////////////////////////

	    let margin = { top: 60, left: 30, right: 30, bottom: 60};
		chartHeight = height - margin.top - margin.bottom;
		chartWidth = width - margin.left - margin.right;

		let circleRadius = 5;

		let yCenter = {
			"lib-dem": 0,
			"ele-dem": chartHeight * .3,
			"ele-aut": chartHeight * .6,
			"clo-aut": chartHeight * .9,
		}

		let simulation = d3.forceSimulation(datapoints)
		  .force('charge', d3.forceManyBody().strength(2))
		  .force('x', d3.forceX().x(chartWidth *.5))
		  .force('y', d3.forceY().strength(.5).y(function(d) {
		    return yCenter[d.v2x_regime];
		  }))
		  .force('collision', d3.forceCollide().radius(function(d) {
		    return circleRadius;
		  }))
		  .on("tick", ticked);

		function ticked() {
			let u = d3.select('.chart')
				.selectAll('circle')
				.data(datapoints)
				.join('circle')
				.attr('r', circleRadius)
				.attr("class", "country-circle")
				.attr("class", d => `circle-${d.v2x_regime}`)
				.attr('cx', function(d) {
					return d.x;
				})
				.attr('cy', function(d) {
					return d.y;
				});
		}

		 //////////////////////////
		 /// Building the chart ///
		 //////////////////////////

		let svg = d3.select(selector)
		 	.append("svg")
		 	.attr("height", height)
		    .attr("width", width);

		let chart = svg.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		    .attr("class", "chart");

	  })


	  .catch((error) => {
	    console.error(error);
	  });
}

chartTwo(320, 500, "#chart-02-xs");