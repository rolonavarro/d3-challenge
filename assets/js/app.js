// @TODO: YOUR CODE HERE!

// Video example of how to make chart https://scrimba.com/p/pb4WsX/ckV6eHM

// Step 1: Set up chart
//------------------------------------------
var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create SVG wrapper, append SVG group
// that will hold the chart and shitf the latter
// by left and top margins.
// ------------------------------------------
var svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Step 3: import data from the donuts.csv file
// ------------------------------------------
(async function getData(){
    const Bdata = await d3.csv("assets/data/data.csv").catch(function(error) {
      console.log(error);
    });

    // Step 4: Parse the data
    // -------------------------------------
    console.log(Bdata)

    // Format the poverty and lacks healthcare
    Bdata.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        // console.log(data.healthcare);
    });


    // Step 5: Create Scales for chart
    // -------------------------------------
    var xScale = d3.scaleLinear()
        .range([0, width])
        .domain([8, (d3.max(Bdata, data => data.poverty) + 2)]);

    var yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(Bdata, data => data.healthcare)]);
        
    // Step 6: Create Axes
    // -------------------------------------
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // step 6: Append the axes to the chartGroup
    // -----------
    // Add x-axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    // Add y-axis
    chartGroup.append("g").call(leftAxis);

    // Step 7: Add the correct dots to the graph
    // ---------------------
    chartGroup.selectAll("dot")
        .data(Bdata)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("stroke", "#32CD32")
        .attr("stroke-width", 1.5)
        .attr("fill", "#FFFFFF");
})()

