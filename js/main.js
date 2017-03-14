/* Stylesheet by Jacob P. Hrubecky, 2017 */
function myfunc(){
//Parts 1 and 2
    var container = d3.select("body")//get body element from DOM
        .append("svg")//put new SVG in body
        //.datum(500)
        .attr("width", "900px")//function(d){
            //return d + "px";
        //})//assign width
        .attr("height", "500px")//assign height
        .attr("class", "container")//assign class for future styling
        .style("background-color", "rgba(0,0,0,0.2)");//set background color
    
    //innerRect block
    var innerRect = container.append("rect")//put new rect in svg
        .datum(400)
        .attr("width", function(d){
              return d*2;//400*2 = 800
              })
        .attr("height", function(d){
            return d; //400
        })
        .attr("class", "innerRect")//class name
        .attr("x", 50)//position from left on x axis
        .attr("y", 50)//position from top on y axis
        .style("fill", "#FFFFFF") //fill color
    
    console.log(innerRect);
    

    
    //var textElement =  container.append("text");
    //var textElement2 = container.append("text");
    //var textElement3 = container.append("text");
    
    
    //part 3 - Scales
    //simplist = linear scale: continuous function
    //  set certain eqn = to f(x).

    /*
   d3.json("data/MegaCities.geojson", function(data){ 
       console.log(data);
      
    var textElements = container.selectAll(".textElement")
        .data(data.features)
        .enter()
        .append("text")
        .attr("class", "textElement")
        .attr("x", 50)
        .attr("y", function(d, i){
            console.log(x(d.properties.Pop_2015));
            return x(d.properties.Pop_2015);
        })
        .text(function(d){
            console.log(d);
            return d.properties.City;
        });
   });
	*/

	var cityPops = [
        { 
            city: 'Neenah',
            population: 25501
        },
        {
            city: 'Menasha',
            population: 18498
        },
        {
            city: 'Appleton',
            population: 73596
        },
        {
            city: 'Oshkosh',
            population: 66778
        }
    ];
	
	//min population
	var minPop = d3.min(cityPops, function(d){
		return d.population;
	});
	
	//max population
	var maxPop = d3.max(cityPops, function(d){
		return d.population;
	});
	
	//x axis linear scale
	var x = d3.scaleLinear()
        .domain([0,3])
        .range([90, 750]);
	
	//y axis linear scale
	var y = d3.scaleLinear()
		.range([450, 50])
		.domain([15000, 77000]);
	
	//color scale
	var color = d3.scaleLinear()
		.range([
            "#FDBE85",
            "#D94701"
        ])
		.domain([minPop, maxPop]);
	
	//y axis generator
	var yAxis = d3.axisLeft(y);
	
	//axis element g
	var axis = container.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(50, 0)")
		.call(yAxis);
		
	//create title
	var title = container.append("text")
		.attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");
    
    //create labels
    var labels = container.selectAll(".labels")
        .data(cityPops)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("x", function(d,i){
            return x(i) + Math.sqrt(d.population * 0.01/Math.PI)+5;
        })
        .attr("y", function(d){
            return y(d.population);
        });
    
    //first line of label
   var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d){
            return d.city;
        });

    //create format generator
    var format = d3.format(",");    
    
    //second line of label
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "15")//vertical offset
        .text(function(d){
            return "Pop. " + format(d.population);
        });
	
	//create circles
	var circles = container.selectAll(".circles")
		.data(cityPops)//feed in data
		.enter()
		.append("circle")//add circle for each datum
		.attr("class", "circles")//class name
		.attr("id", function(d){
			return d.city;
		})
		.attr("r", function(d, i){//circle radius
			console.log("d: ", d, "i: ", i)//look at d and i
			var area = d.population * 0.01;
			return Math.sqrt(area/Math.PI);
		})
		.attr("cx", function(d, i){//x coord
			return x(i);
			//return 90 + (i *180);
		})
		.attr("cy", function(d){//y coord
			return y(d.population);
			//return 450 - (d.population * 0.0005);
		})
		.style("fill", function(d, i){
			return color(d.population);
		})
		.style("stroke", "#000");
   
    //get the <body> element from the DOM
    console.log(container);
};

window.onload = myfunc();