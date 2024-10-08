// Animating a Donut with Svg.animate
var chart = new Chartist.Pie('#ct-donut', {
  series: [54, 28, 17],
  labels: [1, 2, 3]
}, {
  donut: true,
  showLabel: false
});

// Peity donut
$('.peity-donut').each(function () {
  $(this).peity("donut", $(this).data());
});

// Peity line
$('.peity-line').each(function() {
  $(this).peity("line", $(this).data());
});
