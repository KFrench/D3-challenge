var states = [];
var abbreviations = [];
var poverty = [];
var obesity = [];
var stateData = [];
var xValue = [];
var yValue = [];

//svg container
var svgHeight = 700;
var svgWidth = 500;

//margins
var margin = {
    top:30,
    right:35,
    bottom:50,
    left:75
};

//chart area considering margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

var xScale = d3.scaleLinear()
    .domain([0,40])
    .range([0, chartWidth]);

var yScale = d3.scaleLinear()
    .domain([0, 20])    
    .range([chartHeight, 0]);

//create svg container 
var chart = d3.select('#scatter').append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth)
    .attr('class', 'chart');

//shift according to margins
var chartGroup = chart.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .attr('width', chartWidth)
    .attr('height', chartHeight)
    .attr('class', 'chartGroup');

//Create axis
var xAxis = d3.axisBottom(xScale);

var yAxis = d3.axisLeft(yScale);

// Load data from csv
d3.csv("./data.csv").then(function(demoData) {
    

    demoData.forEach(function (d) {
        stateData.push(d);
        d.poverty = +d.poverty;
        d.smokes = +d.smokes;
        d.obesity = +d.obesity;
        d.age = +d.age;
        d.income = +d.income;
        d.healthcare = +d.healthcare;
        var xValue = d.poverty;
        var yValue = d.obesity;

    console.log(xValue);
    console.log(yValue); 
// Log state names
    var statedata = demoData.map(data => data.state);
    statedata.push(states);
    console.log("state", statedata);

    var abbreviationsdata = demoData.map(data => data.abbr);
    abbreviationsdata.push(abbreviations);
    console.log("abbreviations", abbreviationsdata);


    var povertydata = demoData.map(data =>+data.poverty);
    povertydata.push(poverty);
    console.log("poverty", povertydata);

    var obesitydata = demoData.map(data => +data.obesity);
    obesitydata.push(obesity);
    console.log("obesity", obesitydata);


chartGroup.append('g')
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(xAxis);

chartGroup.append('g')
    .call(yAxis);

var g = chartGroup.selectAll('circle');
 console.log(stateData)

 // Append circles 
g
    .data(stateData)
    .enter()
    .append('circle')
    .attr('cx', d=>xScale(d.obesity))
    .attr('cy', d=> yScale(d.poverty))
    .attr('r', 15)
    .attr('fill', "blue")
    .style('opacity', '0.3');
//Add state abbreivations to circles

var circleLabel = chartGroup.selectAll().data(stateData).enter().append('text');

circleLabel.attr("x", function(d) {
    return xScale(d.obesity);
  })
  .attr("y", function(d) {
    return yScale(d.poverty);
  })
  .text(function(d) {
    return d.abbr;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "10px")
  .attr("text-anchor", "middle")
  .attr("fill", "white");

chartGroup
    .append('text')
    .attr('class', 'title')
    .attr('y', '-10')
    .attr('x', '20')
    .text('Poverty vs Obesity Across U.S. States (2014)');
    })
// Create axes labels
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (chartHeight / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Poverty (%)");

chartGroup.append("text")
  .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top})`)
  .attr("class", "axisText")
  .text("Obese (%)");


});