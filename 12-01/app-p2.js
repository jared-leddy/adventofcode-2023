// Core Modules
const events = require('events');
const fs = require('fs');
const readline = require('readline');

// create array to store values
const locations = [];
let arrayTotal = 0;
let iterationCount = 0;
(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('data2-test.txt'),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      const lineArray = line.match(/(one|two|three|four|five|six|seven|eight|nine|zero|\d)/gi);
      const firstDigit = [];
      const wordToNumber = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        zero: 0,
      };

      lineArray.forEach((item) => {
        const numCheck = item * 1;
        if (isNaN(numCheck)) {
          firstDigit.push(wordToNumber[item]);
        } else {
          firstDigit.push(numCheck);
        }
      });
      const lastDigit = [];
      for (let i = firstDigit.length - 1; i >= 0; i--) {
        const valueAtIndex = firstDigit[i];
        lastDigit.push(valueAtIndex);
      }
      const convertToNumber = `${firstDigit[0]}${lastDigit[0]}` * 1;
      iterationCount += 1;
      return locations.push(convertToNumber);
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
        console.log('iterationCount: ', iterationCount);
        console.log('arrayTotal', arrayTotal);
      });
    console.log('Read file done.');
  } catch (err) {
    console.error(err);
  }
})();
