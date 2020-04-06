var cities = [];
var abbreviations = [];
var poverty = [];
var obesity = [];
demoData=[];
// Load data from csv
d3.csv("./data.csv").then(function(demoData) {
    console.log(demoData);

//Log state names
var citiesdata = demoData.map(data => data.state);
citiesdata.push(cities);
console.log("cities", citiesdata);

var abbreviationsdata = demoData.map(data => data.abbr);
abbreviationsdata.push(abbreviations);
console.log("abbreviations", abbreviationsdata);

var povertydata = demoData.map(data =>+data.poverty);
povertydata.push(poverty);
console.log("poverty", povertydata);

var obesitydata = demoData.map(data => +data.obesity);
obesitydata.push(obesity);
console.log("obesity", obesitydata);


}).catch(function(error) {
    console.log(error);
  });
//svg container
var svgHeight = 600;
var svgWidth = 500;

//margins
var margin = {
    top:50,
    right:50,
    bottom:50,
    left:50
};

//chart area considering margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.right - margin.left;

//create svg container 
var svg = d3.select("#scatter").append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

//shift according to margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var yScale = d3.scaleLinear()
    .domain([0, 20])    
    .range([chartHeight, 0]);

var xScale = d3.scaleLinear()
    .domain([0,40])
    .range([0, chartWidth]);

//Create axis
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

//Set x to the bottom and set y axis
chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

chartGroup.append("g")
    .call(yAxis);

chartGroup.selectAll(".scatter")
    .data(demoData)
    .enter()
    .append("circle")
    .classed("scatter", true)
    .attr("cx", d =>xScale(obesitydata)
    .attr("cy", d =>yScale(povertydata)
    .attr("r", 1.5)
    .style("fill", "#69b3a2")
        )

        );       
