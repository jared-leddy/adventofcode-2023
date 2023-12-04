// Core Modules
const events = require('events');
const fs = require('fs');
const readline = require('readline');

// create array to store values
const locations = [];
let arrayTotal = 0;

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('data.txt'),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      let sum = 0;
      const firstDigit = line.match(/\d/);
      const lastDigit = line.match(/\d(?=[^\d]*$)/);
      if (firstDigit && lastDigit) {
        sum += parseInt(firstDigit[0] + lastDigit[0], 10);
      }
      return locations.push(sum);
    });

    await events
      .once(rl, 'close')
      .then(() => {
        locations.forEach((item) => {
          const updatedValue = (arrayTotal += item);
          return updatedValue;
        });
      })
      .then(() => {
        console.log('arrayTotal', arrayTotal);
      });
    console.log('Read file done.');
  } catch (err) {
    console.error(err);
  }
})();
