fetch("stock.csv")
  .then((response) => response.text())
  .then((data) => {
    const csvData = data.trim();
    const parsedData = d3.csvParse(csvData);
    const dataArray = parsedData.map((d) => +d["Close"]);
    console.log(dataArray);
  })
  .catch((error) => console.error(error));
