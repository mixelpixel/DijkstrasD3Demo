/******************************************************************************
 * Establish LA and NY cities as start and end points
 * randomly select additional cities to use for calculating
 * the shortest path using Dijkstra's algorithm
 ******************************************************************************/
'use-strict';
/* eslint no-console: 0 */

// const process = require('process'); // <~~~ Not needed, just making linter happy
// const cities = require('./cities.js');
const cities = require('./convertCityCoordinates.js');
const cityList = cities.cities;
// console.log('1) List length:', cityList.length);

const distanceBetween = require('./distance.js');
const dist = distanceBetween.distanceBetween;

// Start and destination of shortest path
const LA = cityList[12268];
const NY = cityList[71590];
let vertexes = [LA, NY];
// Add another group of cities from the big list
// const numOfVertexes = process.argv[2] || 10;
const numOfVertexes = 1000;
for (let i = 0; i < numOfVertexes; i++) {
  vertexes.push(cityList[Math.floor(Math.random() * cityList.length)]);
}
// console.log(vertexes);
// console.log(vertexes.length);

// list of connected cities - limiting LA and NY to one connection, all others connected
// s = starting node (from)
// t = target node (to)
// len = length as the "weight" of the "edge"
let edgeList = [
  { s: 0,
    t: 2,
    len: dist(vertexes[0], vertexes[2]),
    route: `from ${vertexes[0].name} to ${vertexes[2].name}`,
  },
  { s: 1,
    t: vertexes.length - 1,
    len: dist(vertexes[1], vertexes[vertexes.length - 1]),
    route: `from ${vertexes[1].name} to ${vertexes[vertexes.length - 1].name}`,
  },
];
// add edges between each and every city except LA and NY
for (let i = 2; i < numOfVertexes + 2; i++) {
  for (let j = 2; j < numOfVertexes + 2; j++) {
    if (j !== i) {
      edgeList.push({s: i, t: j, len: dist(vertexes[i], vertexes[j]), route: `from ${vertexes[i].name} to ${vertexes[j].name}`});
    }
  }
}
// console.log(edgeList);

module.exports = {
  vertexes,
  edgeList,
};
