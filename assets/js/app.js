// @TODO: YOUR CODE HERE!

// Video example of how to make chart https://scrimba.com/p/pb4WsX/ckV6eHM

// var svg = d3.select(".row")
//     .append("svg")

// (async function(){
//     var Data = await d3.csv("assets/data/data.csv").catch(function(error) {
//       console.log(error);
//     });
    
//     // console.log(Data)

//     var state = Data["state"];
//         console.log(state);

// })()


 // javascript
var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
// var dataset = [2,3,4,5,6]

// Set margins
var svgWidth = 500, svgHeight = 300, barPadding = 10;
var barWidth = (svgWidth / dataset.length);

// Select the correct classes
var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Add scales to the graph 

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgHighit]);
  
// Create the Graph
var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function(d) {
        return svgHeight - yScale(d) 
    })
    .attr("height", function(d) { 
        return yScale(d); 
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0]; 
        return "translate("+ translate +")";
    });
