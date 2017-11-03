'use-strict';
/* eslint no-console: 0 */

const city_list = require('./cities.js');
const distanceBetween = require('./distance.js');

// console.log(city_list);
// console.log(city_list.Cities);
console.log(city_list.Cities.length);
console.log(city_list.Cities[0]);
console.log(city_list.Cities[0].name);
// console.log(city_list.Cities.indexOf({x: '33613.1588', y: '86118.3061', name: 'Lincoln | Talladega | AL' }));

// for (let i = 0; i < city_list.Cities.length; i++) {
//   if (city_list.Cities[i].name === 'South Los Angeles | Los Angeles | CA') {
//     console.log('LA', i);
//   }
//   if (city_list.Cities[i].name === 'Washington Heights | New York | NY') {
//     console.log('NY', i);
//   }
// }

console.log(city_list.Cities[0]);
console.log(city_list.Cities[12268]); // ~~~> LA
console.log(city_list.Cities[71590]); // ~~~> NY
console.log(city_list.Cities[city_list.Cities.length - 1]);

console.log(distanceBetween.distanceBetween(city_list.Cities[12268], city_list.Cities[71590]));


/*
Cities = [
  {"x":"33613.1588","y":"86118.3061","name":"Lincoln | Talladega | AL"}, ...
  */
