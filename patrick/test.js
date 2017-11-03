/******************************************************************************
 * Establish LA and NY cities as start and end points
 * randomly select additional cities to use for calculating
 * the shortest path using Dijkstra's algorithm
 ******************************************************************************/
'use-strict';
/* eslint no-console: 0 */

// const cities = require('./cities.js');
const cities = require('./convertCityCoordinates.js');
const cityList = cities.cities;
const distanceBetween = require('./distance.js');
const dist = distanceBetween.distanceBetween;

console.log('1) List length:', cityList.length);

const LA = cityList[12268];
const NY = cityList[71590];

console.log(dist(LA, NY));
