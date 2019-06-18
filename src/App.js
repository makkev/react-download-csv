import React from 'react';
import './App.css';

function App() {
  var stockData = [
    {
        Symbol: "AAPL",
        Company: "Apple Inc.",
        Price: "132.54"
    },
    {
        Symbol: "INTC",
        Company: "Intel Corporation",
        Price: "33.45"
    },
    {
        Symbol: "GOOG",
        Company: "Google Inc",
        Price: "554.52"
    },
  ];

  const convertArrayOfObjectsToCSV = args =>  {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
  }

  var data, filename;

  var csv = convertArrayOfObjectsToCSV({
      data: stockData
  });

  filename = 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  console.log('data: ', data);
  console.log('filename: ', filename);

  return (
    <div className="App">
      <a href={data} download={filename} >Download CSV</a>
    </div>
  );
}

export default App;
