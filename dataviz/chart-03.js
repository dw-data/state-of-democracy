function chartThree(width, height, selector) {

	// Defining color cosntants

	d3.csv("chart-03.csv")
	  .then((datapoints) => {

	  	///////////////////////
	  	/// Data processing ///
	  	///////////////////////

	  	let groups = d3.group(datapoints, d => d.v2x_regime);
	  	console.log(groups);

	    ///////////////////////////////////////////
	    //// Dimensions, scales and generators ////
	    ///////////////////////////////////////////

	    let margin = { top: 20, left: 30, right: 30, bottom: 40};
		chartHeight = height - margin.top - margin.bottom;
		chartWidth = width - margin.left - margin.right;

		let circleRadius = 5;

		let yCenter = chartHeight * .5;
		let xCenter = chartWidth * .5;

		let minIndexValue = 0;
		let maxIndexValue = 1;

		let yPositionScale = d3.scaleLinear()
			.range([chartHeight, 0])
			.domain([minIndexValue, maxIndexValue]);

		let svg = d3.select(selector)
		 	.append("svg")
		 	.attr("height", height)
		    .attr("width", width);

		let chart = svg.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		    .attr("class", "chart");

		let circleLabelHolder = chart.append("g")
			.attr("class", "circle-label-holder");

		circleLabelHolder.selectAll("text")
			.data(datapoints)
			.join('text')
			.attr('x', 0)
			.attr('y', 1)
			.text(d => d.country_text_id)
			.attr("class", "label circle-label");

		let simulation = d3.forceSimulation(datapoints)
			  .force('charge', d3.forceManyBody().strength(2))
			  .force('x', d3.forceX().x(xCenter))
			  .force('y', d3.forceY().strength(10).y(d => yPositionScale(d.v2x_libdem)))
			  .force('collision', d3.forceCollide().radius(circleRadius + 1))
			  .on("tick", ticked);


		function ticked() {

			let selectedCountries = [
				'DEU', 'CHL', 'NOR',
				'BRA', 'ZAF', 'POL',
				'HUN', 'VEN', 'IRN',
				'QAT', 'CHN', 'PRK'
			]

			let u = d3.select('.chart')
				.selectAll('circle')
				.data(datapoints)
				.join('circle')
				.attr('r', circleRadius)
				.attr("class", "country-circle")
				.attr("class", d => `circle-${d.v2x_regime}`)
				.attr("id", d => `force-circle-${d.country_text_id}`)
				.attr("opacity", function(d){
					return selectedCountries.includes(d.country_text_id) ? 1 : .3;

				})
				.attr("stroke", function(d) {
					return selectedCountries.includes(d.country_text_id) ? "#000" : "none";

				})
				.attr("stroke-width", 2)
				.attr('cx', function(d) {
					return d.x;
				})
				.attr('cy', function(d) {
					return d.y;
				})
				.lower();


			let labels = d3.select('.circle-label-holder')
				.selectAll('text')
				.join(datapoints)
				.attr("x", d => d.x)
				.attr("y", d => d.y)
				.attr("z-index", 9999)
				.attr("display", function(d){
					return selectedCountries.includes(d.country_text_id) ? "unset" : "none";
				})
				.raise();
	   
		}

		// y axis markers
		let yAxis = d3.axisLeft(yPositionScale)
	    	.tickValues([0, .25, .5, .75, 1])
	    	.tickSize(-chartWidth);
	   
    	chart.append("g")
	      .attr("class", "axis y-axis")
	      .call(yAxis)
	      .lower();

	    // Pushes labels slightly
	    d3.selectAll(".x-axis > .tick > text")
	    	.attr("dy", -10)

	  })

	  .catch((error) => {
	    console.error(error);
	  });
}

chartThree(500, 900, "#chart-03-xs");