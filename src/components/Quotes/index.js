const fs = require('fs');

function extractQuotes(inputFileName, outputFileName) {
  // Read the JSON file
  fs.readFile(inputFileName, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading the file: ${err}`);
      return;
    }

    // Parse the JSON data
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      console.log(`Error parsing the JSON data: ${e}`);
      return;
    }

    // Extract objects containing the word "quotes"
    const extractedData = jsonData.filter(obj => {
      return JSON.stringify(obj).includes('"quotes"');
    });

    // Write the extracted objects to another JSON file
    fs.writeFile(outputFileName, JSON.stringify(extractedData, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(`Error writing to the file: ${err}`);
        return;
      }
      console.log(`Data successfully written to ${outputFileName}`);
    });
  });
}

// Example usage
extractQuotes('sebastia.json', 'output.json');