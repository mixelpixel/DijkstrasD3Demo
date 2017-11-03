/******************************************************************************
 * Convert Thomsons text file to a JS object
 * 115,475 U.S. cities
 * x & y coordinates & "Name County State abbreviation"
 ******************************************************************************/
'use-strict';
/* eslint no-console: 0 */

const fs = require('fs');
const os = require('os');
const rawtext = fs.readFileSync('./usa115475_cities.txt', 'utf8').split(os.EOL);

const cityList = [];

for (let i = 0; i < rawtext.length; i++) {
  cityList.push(rawtext[i].split(' '));
}
cityList.pop();

for (let j = 0; j < cityList.length; j++) {
  for (let k = 0; k < cityList[j].length; k++) {
    if (cityList[j][k] === '') {
      cityList[j].splice(k, 1);
    }
  }
}
for (let m = 0; m < cityList.length; m++) {
  for (let n = 0; n < cityList[m].length; n++) {
    if (cityList[m][n] === '') {
      cityList[m].splice(n, 1);
    }
  }
}
for (let p = 0; p < cityList.length; p++) {
  for (let q = 0; q < cityList[p].length; q++) {
    if (cityList[p][q] === '|') {
      cityList[p].splice(q, 1);
    }
  }
}

let cities = [];

for (let x = 0; x < cityList.length; x++) {
  let cityCountyState = cityList[x].splice(2).join(' ');
  cities.push({x: cityList[x][0], y: cityList[x][1], name: cityCountyState});
}

// console.log(cities);
// console.log(cities.length);

// fs.writeFile('./output.js', JSON.stringify(cities), 'utf8', (err) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('The file was saved!');
// });

module.exports = {
  cities,
};
