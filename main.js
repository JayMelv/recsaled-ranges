fetch("stock.csv")
  .then((response) => response.text())
  .then((data) => {
    const csvData = data.trim();
    const parsedData = d3.csvParse(csvData);
    const dataArray = parsedData.map((d) => +d["Close"]);
    console.log(dataArray);
  })
  .catch((error) => console.error(error));

console.log(dataArray);
// Define your data
var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Define the window sizes to use
var windowSizes = [23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23];

// Calculate the average
var average =
  data.reduce(function (sum, value) {
    return sum + value;
  }, 0) / data.length;

// Calculate the deviations
var deviations = data.map(function (value) {
  return value - average;
});

// Calculate the cumulative sum
var cumulativeSum = deviations.reduce(function (sum, deviation) {
  return sum + deviation;
}, 0);

// Calculate the range and standard deviation for each window size
var rescaledRanges = windowSizes.map(function (windowSize) {
  var ranges = [];
  for (var i = 0; i < data.length; i += windowSize) {
    var window = deviations.slice(i, i + windowSize);
    var range = Math.max.apply(null, window) - Math.min.apply(null, window);
    ranges.push(range);
  }
  var standardDeviation = Math.sqrt(
    ((windowSize / (windowSize - 1)) *
      ranges
        .map(function (range) {
          return range * range;
        })
        .reduce(function (sum, value) {
          return sum + value;
        }, 0)) /
      windowSize
  );
  return (
    ranges.reduce(function (sum, range) {
      return sum + range / standardDeviation;
    }, 0) / ranges.length
  );
});

var ctx = document.getElementById("rescaled-range-chart").getContext("2d");
var chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: windowSizes,
    datasets: [
      {
        label: "Rescaled Range",
        data: rescaledRanges,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: "Window Size",
        },
      },
      y: {
        title: {
          display: true,
          text: "Rescaled Range",
        },
      },
    },
  },
});
// Plot the rescaled ranges
//console.log(rescaledRanges); // Or use a charting library to visualize the results
