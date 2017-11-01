/******************************************************************************
 * https://github.com/thomcom/DijkstrasD3Demo
 * Weds PM lecture:
 * coding a graph w/Beej
 * take a bunch of nodes (vertexes) and a bunch of edges then build a graph
 ******************************************************************************/

// Vertexes: numbers for "city names"
let V = [0, 1, 2, 3, 4, 5];

// Edges (describe which verts go to other verts)
// s = starting node (from)
// t = target node (to)
// len = length as the "weight" of the "edge"
// one way or two way weight?
let E = [
  {s: 0, t: 1, len: 7},
  // {s: 1, t: 0, len: 7}, // <~~~ wonky 2-way implementation
  {s: 0, t: 2, len: 9},
  {s: 0, t: 5, len: 14},
  {s: 1, t: 2, len: 10},
  {s: 1, t: 3, len: 15},
  {s: 2, t: 5, len: 2},
  {s: 2, t: 3, len: 11},
  {s: 3, t: 4, len: 6},
  {s: 4, t: 5, len: 9},
];

// find the city (name) and collect all the edges
/*
  {
    name: 0, // <--- this will be the key
    edges: [
      {
        target: 1,
        length: 7,
      },
      {
        target: 2,
        length: 9,
      },
      {
        target: 5,
        length: 14,
      },
    ],
  },
  */

function make_graph() {
  // to hold all final nodes
  let graph = {};

  // add all verts to graph
  for (let v of V) {
    console.log(v);
    graph [v] = {
      edges: []
    };
  }

  // add all the edges
  for (let e of E) {
    // one directional
    graph[e.s].edges.push({ target: e.t, length: e.len})
    // two directional
    graph[e.t].edges.push({ target: e.s, length: e.len})
  }
  return graph;
}

console.log(make_graph(V));

// TODO Dijkstra stuff
