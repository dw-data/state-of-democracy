function chartOne(width, height, selector) {

	console.log("Running function chartOne");

	// Defining color cosntants

	d3.csv("chart-01.csv")
	  .then((datapoints) => {

	  	console.log(datapoints);

	    ///////////////////////////////////////////
	    //// Dimensions, scales and generators ////
	    ///////////////////////////////////////////

	    let margin = { top: 30, left: 60, right: 120, bottom: 30};
		chartHeight = height - margin.top - margin.bottom;
		chartWidth = width - margin.left - margin.right;

	    let minYear = 1900;
	    let maxYear = 2021;
		let xPositionScale = d3.scaleLinear()
			.range([0, chartWidth])
			.domain([minYear, maxYear]);

		let minCount = 0;
		let maxCount = 150;
		let yPositionScale = d3.scaleLinear()
			.range([chartHeight, 0])
			.domain([minCount, maxCount]);


		let autocracyLine = d3.line()
			// .curve(d3.curveStepAfter)
			.x(d => xPositionScale(+d.year))
			.y(d => yPositionScale(+d.autocracy));

		let democracyLine = d3.line()
			// .curve(d3.curveStepAfter)
			.x(d => xPositionScale(+d.year))
			.y(d => yPositionScale(+d.democracy));

		 //////////////////////////
		 /// Building the chart ///
		 //////////////////////////

		let svg = d3.select(selector)
		 	.append("svg")
		 	.attr("height", height)
		    .attr("width", width);

		let chart = svg.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		    .attr("class", "chart")
		    .attr("color", "red");
		
		// Democracy line
		chart.append("path")
			.data(datapoints)
			.attr("class", "line")
			.attr("id", "democracy-line")
			.attr("d", democracyLine(datapoints));

		// Autocracy line
		chart.append("path")
			.data(datapoints)
			.attr("class", "line")
			.attr("id", "autocracy-line")
			.attr("d", autocracyLine(datapoints));

		// Adds text markers to the end of each line
		let lastDatapoint = datapoints[datapoints.length - 1];

		chart.append("text")
			.text("Democracies")
			.attr("x", xPositionScale(lastDatapoint.year))
			.attr("dx", 5)
			.attr("dy", -8)
			.attr("y", yPositionScale(lastDatapoint.democracy))
			.attr("class", "label")
			.attr("id", "democracy-label");

		chart.append("text")
			.text("Autocracies")
			.attr("x", xPositionScale(lastDatapoint.year))
			.attr("dx", 5)
			.attr("dy", 8)
			.attr("y", yPositionScale(lastDatapoint.democracy))
			.attr("class", "label")
			.attr("id", "autocracy-label");

		// Add the two axis
	    let xAxis = d3.axisBottom(xPositionScale)
	    	.tickSize(20 - chartHeight)
	    	.tickValues([1900, 2021])
	    	.tickFormat(d3.format("d")); // Remove the thousands marker

	    chart.append("g")
	      .attr("fill","black")
	      .attr("transform", "translate(0," + chartHeight+ ")")
	      .attr("class", "axis x-axis")
	      .call(xAxis);

	    let yAxis = d3.axisLeft(yPositionScale)
	    	.tickValues([0, 20, 40, 60, 80, 100, 120, 140])
	    	.tickSize(-chartWidth);
	    	
    	chart.append("g")
	      .attr("class", "axis y-axis")
	      .call(yAxis)

	    // Pushes labels slightly
	   d3.selectAll(".x-axis > .tick > text")
	    	.attr("dy", 20)

	    // Pushes labels slightly
	    d3.selectAll(".y-axis > .tick > text")
	    	.attr("dx", -10)

	  })





	  .catch((error) => {
	    console.error(error);
	  });
}

chartOne(320, 420, "#chart-01-xs");
chartOne(600, 520, "#chart-01-md");
chartOne(1920, 440, "#chart-01-xl");