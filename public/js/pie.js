// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
var nyc = document.getElementById("nyc");
var paris = document.getElementById("paris");
var istanbul = document.getElementById("istanbul");

var k = localStorage.getItem("k");
var j = localStorage.getItem("j");
var i = localStorage.getItem("i");

nyc.addEventListener('submit', (event) => {
    k = localStorage.getItem("k");
    if(k == 0){
        k = 1;
        k = JSON.stringify(k);
        localStorage.setItem("k", k);
    }
    k = JSON.parse(k);
    k = k + 1;
    k = JSON.stringify(k);
    localStorage.setItem("k", k);
    k = JSON.parse(k);
});

paris.addEventListener('submit', (event) => {
    i = localStorage.getItem("i");
    if(i == 0){
        i = 1;
        i = JSON.stringify(i);
        localStorage.setItem("i", i);
    }
    i = JSON.parse(i);
    i = i + 1;
    i = JSON.stringify(i);
    localStorage.setItem("i", i);
    i = JSON.parse(i);
});

istanbul.addEventListener('submit', (event) => {
    j = localStorage.getItem("j");
    if(j == 0){
        j = 1;
        j = JSON.stringify(j);
        localStorage.setItem("j", j);
    }
    j = JSON.parse(j);
    j = j + 1;
    j = JSON.stringify(j);
    localStorage.setItem("j", j);
    j = JSON.parse(j);
});

if(k == 0){
    k = 1;
    k = JSON.stringify(k);
    localStorage.setItem("k", k);
}
k = JSON.parse(k);

if(j == 0){
    j = 1;
    j = JSON.stringify(j);
    localStorage.setItem("j", j);
}
j = JSON.parse(j);

if(i == 0){
    i = 1;
    i = JSON.stringify(i);
    localStorage.setItem("i", i);
}
i = JSON.parse(i);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['City', 'Votes'],
  ['Paris', i],
  ['Istanbul', j],
  ['New York City', k]
]);

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'Number of Votes', 'width':1600, 'height':1200};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}