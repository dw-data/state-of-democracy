function chartSix(width, height, selector) {

	console.log("Running function draw line chart");

	// Defining color cosntants

	d3.csv("chart-06.csv")
	  .then((datapoints) => {

	  	/////////////////////////
	  	//// Data processing ////
	  	/////////////////////////

	  	// Nests the data by grouping it by country
	  	let groups = d3.group(datapoints, d => d.country_text_id);
		console.log(groups)

		let margin = { top: 50, left: 80, right: 20, bottom: 10};
		chartHeight = height - margin.top - margin.bottom;
		chartWidth = width - margin.left - margin.right;

	    ///////////////////////////////////////////
	    //// Dimensions, scales and generators ////
	    ///////////////////////////////////////////

	    // Define scale for the x Axis
	    let minYear = 1980;
	    let maxYear = 2021;
		let xPositionScale = d3.scaleLinear()
			.range([0, chartWidth])
			.domain([minYear, maxYear]);

		// Define scale for the y Axis
		let minIndexValue = 0;
		let maxIndexValue = 1;
		let yPositionScale = d3.scaleLinear()
			.range([chartHeight, 0])
			.domain([minIndexValue, maxIndexValue]);


		// Defines a line generator for the central measurement
		let line = d3.line()
			// .curve(d3.curveStepAfter)
			.x(d => xPositionScale(+d.year))
			.y(d => yPositionScale(+d.v2x_polyarchy));

		  // Defines an area generator for the convidence interval

		 //////////////////////////
		 /// Building the chart ///
		 //////////////////////////

		let svg = d3.select(selector)
		 	.append("svg")
		 	.attr("height", height + margin.top + margin.bottom)
		    .attr("width", width + margin.left + margin.right);

		let chart = svg.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		    .attr("class", "chart")
		    .attr("color", "red");

		
		// Adds one line for each group
		groups.forEach(function(data, name) {

			chart.append("path")
				.attr("class", "line")
				.attr("class", "country-line")
				.attr("id", `line-${name}`)
				.attr("d", line(data));



			// Adds text markers to the end of each line
			let lastDatapoint = data[data.length - 1];
			

			// Adds circle markers to the end
			chart.append("circle")
				.attr("cx", xPositionScale(lastDatapoint.year))
				.attr("cy", yPositionScale(lastDatapoint.v2x_polyarchy))
				.attr("r", 2)
				.attr("id", `circle-${name}`)
				.attr("class", "country-circle");


			chart.append("text")
				.text(function(){

					if (lastDatapoint.country_text_id == 'FIN')
						return 'Finland';
					if (lastDatapoint.country_text_id == 'ECU')
						return 'Ecuador';					

				})
				.attr("x", xPositionScale(lastDatapoint.year))
				.attr("y", yPositionScale(lastDatapoint.v2x_polyarchy))
				.attr("dx", 5)
				.attr("dy", function(){
					if (lastDatapoint.country_text_id == 'IND')
						return 15
				})
				.attr("class", "label");

		})

		// Add the two axis
	    let xAxis = d3.axisBottom(xPositionScale)
	    	.tickSize(-chartHeight)
	    	.tickValues([1980, 2021])
	    	.tickFormat(d3.format("d")); // Remove the thousands marker

	   	chart.append("g")
	      .attr("fill","black")
	      .attr("transform", "translate(0," + chartHeight+ ")")
	      .attr("class", "axis x-axis")
	      .call(xAxis);

	     let yAxis = d3.axisLeft(yPositionScale)
	    	.tickValues([0, 1])
	    	.tickSize(1)
	    	.tickFormat(d3.format("d"));
	    	
    	chart.append("g")
	      .attr("class", "axis y-axis")
	      .call(yAxis)

	    // Pushes labels slightly
	   d3.selectAll(".x-axis > .tick > text")
	    	.attr("dy", 25)

	    // Pushes labels slightly
	    d3.selectAll(".y-axis > .tick > text")
	    	.attr("dx", -15)


	  })



	  .catch((error) => {
	    console.error(error);
	  });
}

chartSix(300, 380, "#chart-06-xs");