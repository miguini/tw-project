/*
Template Name: MS- Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: chartjs Init Js File
*/

!function($) {
    "use strict";

    var ChartJs = function() {};

    ChartJs.prototype.respChart = function(selector, type, data, options) {
        Chart.defaults.global.defaultFontColor = "#adb5bd",
        Chart.defaults.scale.gridLines.color = "rgba(108, 120, 151, 0.1)";
        
        // get selector by context
        var ctx = selector.get(0).getContext("2d");
        // pointing parent container to make chart js inherit its width
        var container = $(selector).parent();

        // enable resizing matter
        $(window).resize( generateChart );

        // this function produce the responsive Chart JS
        function generateChart(){
            // make chart width fit with its container
            var ww = selector.attr('width', $(container).width());
            switch(type){
                case 'Line':
                    new Chart(ctx, { type: 'line', data: data, options: options });
                    break;
                case 'Doughnut':
                    new Chart(ctx, { type: 'doughnut', data: data, options: options });
                    break;
                case 'Pie':
                    new Chart(ctx, { type: 'pie', data: data, options: options });
                    break;
                case 'Bar':
                    new Chart(ctx, { type: 'bar', data: data, options: options });
                    break;
                case 'Radar':
                    new Chart(ctx, { type: 'radar', data: data, options: options });
                    break;
                case 'PolarArea':
                    new Chart(ctx, { data: data, type: 'polarArea', options: options });
                    break;
            }
        };

        // run function - render chart at first load
        generateChart();
    };

    //init
    ChartJs.prototype.init = function() {
        // Rendimiento Line Chart (Gráfico dinámico de rendimiento)
        var lineChart = {
            labels: data.meses,  // Usa tus datos dinámicos
            datasets: [{
                label: 'Rendimiento',
                data: data.rendimiento,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            }]
        };

        var lineOpts = {
            responsive: true,
            maintainAspectRatio: false, // Permite que se ajuste dinámicamente
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true,
                }
            }
        };
        this.respChart($("#chartPerformance"), 'Line', lineChart, lineOpts);

        // Configuraciones preexistentes de otros gráficos
        //donut chart
        var donutChart = {
            labels: ["Desktops", "Tablets"],
            datasets: [{
                data: [300, 210],
                backgroundColor: ["#3c4ccf", "#ebeff2"],
                hoverBackgroundColor: ["#3c4ccf", "#ebeff2"],
                hoverBorderColor: "#fff"
            }]
        };
        this.respChart($("#doughnut"), 'Doughnut', donutChart);

        //Pie chart
        var pieChart = {
            labels: ["Desktops", "Tablets"],
            datasets: [{
                data: [300, 180],
                backgroundColor: ["#02a499", "#ebeff2"],
                hoverBackgroundColor: ["#02a499", "#ebeff2"],
                hoverBorderColor: "#fff"
            }]
        };
        this.respChart($("#pie"), 'Pie', pieChart);

        //barchart
        var barChart = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "Sales Analytics",
                backgroundColor: "#02a499",
                borderColor: "#02a499",
                borderWidth: 1,
                hoverBackgroundColor: "#02a499",
                hoverBorderColor: "#02a499",
                data: [65, 59, 81, 45, 56, 80, 50, 20]
            }]
        };
        this.respChart($("#bar"), 'Bar', barChart);

        //radar chart
        var radarChart = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [{
                label: "Desktops",
                backgroundColor: "rgba(2, 164, 153, 0.2)",
                borderColor: "#02a499",
                pointBackgroundColor: "#02a499",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#02a499",
                data: [65, 59, 90, 81, 56, 55, 40]
            }, {
                label: "Tablets",
                backgroundColor: "rgba(60, 76, 207, 0.2)",
                borderColor: "#3c4ccf",
                pointBackgroundColor: "#3c4ccf",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#3c4ccf",
                data: [28, 48, 40, 19, 96, 27, 100]
            }]
        };
        this.respChart($("#radar"), 'Radar', radarChart);

        //Polar area chart
        var polarChart = {
            datasets: [{
                data: [11, 16, 7, 18],
                backgroundColor: ["#38a4f8", "#02a499", "#ec4561", "#3c4ccf"],
                label: 'My dataset', // for legend
                hoverBorderColor: "#fff"
            }],
            labels: ["Series 1", "Series 2", "Series 3", "Series 4"]
        };
        this.respChart($("#polarArea"), 'PolarArea', polarChart);
    },
    $.ChartJs = new ChartJs, $.ChartJs.Constructor = ChartJs;

}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.ChartJs.init()
}(window.jQuery);
