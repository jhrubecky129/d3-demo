function initialize(){
    cities();
};

function cities(){
  /*  var cities = [
        'Madison',
        'Milwaukee',
        'Green Bay',
        'Superior'
    ];
    var population = [
        233209,
        594833,
        104057,
        27244
    ];*/
    var citiesObj = {
      'Madison' : 233209,
      'Milwaukee' : 594833,
      'Green Bay' : 104057,
      'Superior' : 27244
    };

    $('#mydiv').append('<table><tr id="headerRow">');
    $('#headerRow').append('<th>City</th>');
    $('#headerRow').append('<th>Population</th>');
/*
    var table = document.createElement("table");

    var headerRow = document.createElement("tr");

    var cityHeader = document.createElement("th");
    cityHeader.innerHTML = "City";
    headerRow.appendChild(cityHeader);

    var popHeader = document.createElement("th");
    popHeader.innerHTML = "Population";
    headerRow.appendChild(popHeader);

    table.appendChild(headerRow);
*/
    //for (var i = 0; i < cities.length; i++){
    for (var cityKey in citiesObj){
      var htmlString = '<tr><td>' + cityKey + '</td><td>' + citiesObj[cityKey]+ '</td>';
      $('table').append(htmlString);
      /*
        var tr = document.createElement("tr");

        var city = document.createElement("td");
        city.innerHTML = cities[i];
        tr.appendChild(city);

        var pop = document.createElement("td");
        pop.innerHTML = population[i];
        tr.appendChild(pop);

        table.appendChild(tr);
      */
    };

    var mydiv = document.getElementById("mydiv");
    mydiv.appendChild(table);
};

window.onload = initialize();
