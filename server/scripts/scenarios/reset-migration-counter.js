'use strict';

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../../migrations/.migrate');

module.exports = () => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.log(`Reset failed with error: ${err.message}`);
      process.exit(1);
      return;
    }

    let jsonData = JSON.parse(data);
    jsonData.pos = 0;

    fs.writeFile(filePath, JSON.stringify(jsonData), 'utf-8', (err) => {
      if (err) {
        console.log(`Reset failed with error: ${err.message}`);
        process.exit(1);
        return;
      }
      console.log('Migration counter have been reset');
      process.exit(0);
    });
  });
};