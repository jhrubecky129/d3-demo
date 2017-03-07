/* Stylesheet by Jacob P. Hrubecky, 2017 */
function myfunc(){
//Parts 1 and 2
    var container = d3.select("body")
        .append("svg")
        .datum(500)
        .attr("width", function(d){
            return d + "px";
        })
        .attr("height", "500px")
        .attr("class", "container");
    
    //var textElement =  container.append("text");
    //var textElement2 = container.append("text");
    //var textElement3 = container.append("text");
    
    
    //part 3 - Scales
    //simplist = linear scale: continuous function
    //  set certain eqn = to f(x).
    var x = d3.scaleLinear()
        .domain([0, 40])
        .range([0, 500]);
    
   console.log(x);
    
   d3.json("data/MegaCities.geojson", function(data){ 
       console.log(data);
    var textElements = container.selectAll(".textElement")
        .data(data.features)
        .enter()
        .append("text")
        .attr("class", "textElement")
        .attr("x", 0)
        .attr("y", function(d, i){
            console.log(x(d.properties.Pop_2015));
            return x(d.properties.Pop_2015);
        })
        .text(function(d){
            console.log(d);
            return d.properties.City;
        });
   });
        
    //get the <body> element from the DOM
    console.log(container);
};

window.onload = myfunc();