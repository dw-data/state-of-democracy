function chartFive(width, height, selector) {
d3.json("chart-05.json")
	.then((datapoints) => {

		let margin = {left: 10, top: 10, right: 120, bottom: 10};
		let chartWidth = width - margin.left - margin.right;
		let chartHeight = height - margin.top - margin.bottom;

		let svg = d3.select(selector)
		 	.append("svg")
		 	.attr("height", height)
		    .attr("width", width);

		let chart = svg.append("g")
		    .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")")
		    .attr("class", "chart");

		let sankey = d3.sankey()
		    .nodeWidth(20)
		    .nodePadding(40)
		    .size([chartWidth, chartHeight]);

		let path = sankey.links();

		let graph = sankey(datapoints);

		let link = chart.append("g")
			.attr("class", "link-holder")
			.selectAll(".link")
		    .data(graph.links)
		    .enter().append("path")
		      .attr("class", "link")
		      .attr("d", d3.sankeyLinkHorizontal())
		      .attr("stroke-width", function(d) { return d.width; })
		      .attr("class", d =>  `link link-${d.name}`);  


	  	let nodeHolder = chart.append("g")
	  		 .attr("class", "node-holder");

	  	nodeHolder.selectAll(".node")
      		.data(graph.nodes)
		    .enter().append("g")
		    .attr("class", d => `node-holder node-${d.name}`)
			.append("rect")
			  .attr("opacity", 1)
		      .attr("x", function(d) { return d.x0; })
		      .attr("y", function(d) { return d.y0; })
		      .attr("height", function(d) { return d.y1 - d.y0; })
		      .attr("width", sankey.nodeWidth())
		      .attr("class", d => `rect rect-${d.name}`)
		      .lower();


		// Adds circles within the rects
		// They are currently hidden with CSS because
		// the result was not good

	    let rects = d3.selectAll(".rect");
	    let yPositionScale = d3.scalePoint().padding(.5);
	    let xPositionScale = d3.scalePoint();

	    rects.each(function(rect){

	    	console.log(rect);

	    	var fakeData = [];
	    	var counter = rect.value;
	    	let nCols = 4;
	    	let columnId = 0

	    	while (counter > 0) {

	    		var point = { "column": columnId,  "row": Math.floor(counter / nCols)} // index for row and column of the circle
	    		fakeData.push(point);
	    		
	    		counter -= 1;
	    		columnId += 1;
	    		if (columnId >= nCols)
	    			columnId = 0;
	    	}

	    	fakeData = fakeData.sort((a, b) => a.column > b.column);
	    	console.log(fakeData);

	    	let yValues = fakeData.map(d => d.row);
	    	let xValues = fakeData.map(d => d.column);

	    	console.log(yValues, xValues);

	    	yPositionScale.range([rect.y0, rect.y1])
	    		.domain(yValues)

	    	xPositionScale.range([rect.x0 + 10, rect.x1 - 10])
	    		.domain(xValues)


	    	var thisClass = `.node-${rect.name}`;
	    	var thisRect = d3.select(thisClass);

	    	var circles = thisRect.selectAll("circle")
	    			.data(fakeData)
	    			.enter().append("circle")
	    			.attr("cy", d => yPositionScale(d.row))
	    			.attr("cx", d => xPositionScale(d.column))
	    			.attr("class", `circle circle-${rect.name}`)
	    			.attr("r", 5)
	    			.raise();


	    })

	})

	.catch((error) => {
	    console.error(error);
	  });

	}

chartFive(300, 500, "#chart-05-xs");