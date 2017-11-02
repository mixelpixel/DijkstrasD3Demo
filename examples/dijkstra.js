/** WORK IN PROGRESS! */

/**
 * Build a graph for use with Dijkstra
 */

// Take a bunch of nodes (vertexes) and a bunch of edges, and build a graph

// VerTEXAS
let V = [0, 1, 2, 3, 4, 5];

// Edges

// s = starting node (from)
// t = target node (to)
let E = [
  {s: 0, t: 1, len: 7}, // len is the "weight"
  {s: 0, t: 2, len: 9},
  {s: 0, t: 5, len: 14},
  {s: 1, t: 2, len: 10},
  {s: 1, t: 3, len: 15},
  {s: 2, t: 5, len: 2},
  {s: 2, t: 3, len: 11},
  {s: 3, t: 4, len: 6},
  {s: 4, t: 5, len: 9}
];

/**
 * Make the graph
 */
function make_graph() {
  let graph = {};

  // Add all verts to graph
  for (let v of V) {
    graph[v] = {
      edges: []
    };
  }

  // Add all edges
  for (let e of E) {
    graph[e.s].edges.push({ target:e.t, length: e.len});
    graph[e.t].edges.push({ target:e.s, length: e.len});
  }

  return graph;
}

/**
 * Shortest path 
 */
function Dijkstra(graph, source) {

	function findMin(Q) {
		let smallest = Number.MAX_VALUE, smallestIndex;

		for (let i = 0; i < Q.length; i++) {
			if (Q[i].dist <= smallest) {
				smallestIndex = i;
				smallest = Q[i].dist;
			}
		}

		return smallestIndex;
	}

	let Q = [];

	for (let v in Object.keys(graph)) {
		let vertInfo = {
			vert: v,
			dist: v==source? 0: Number.MAX_VALUE,
			prev: null
		};

		Q.push(vertInfo);
	}
	//console.log(JSON.stringify(Q, null, 2));

	while (Q.length > 0) {
		let index = findMin(Q);

		// Remove from Q
		let vertInfo = Q.splice(index, 1)[0];

		let vertNum = vertInfo.vert;
		let neighbors = graph[vertNum].edges;

		for (let n of neighbors) {
			let alt = vertInfo.dist + n.len;
			if (alt < )

		}


17          for each neighbor v of u:           // where v is still in Q.
18              alt ← dist[u] + length(u, v)
19              if alt < dist[v]:               // A shorter path to v has been found
20                  dist[v] ← alt 
21                  prev[v] ← u 
	}
}

Dijkstra(make_graph(), 0);

/*

1  function Dijkstra(Graph, source):
2
3      create vertex set Q
4
5      for each vertex v in Graph:             // Initialization
6          dist[v] ← INFINITY                  // Unknown distance from source to v
7          prev[v] ← UNDEFINED                 // Previous node in optimal path from source
8          add v to Q                          // All nodes initially in Q (unvisited nodes)
9
10      dist[source] ← 0                        // Distance from source to source
11      
12      while Q is not empty:
13          u ← vertex in Q with min dist[u]    // Node with the least distance
14                                                      // will be selected first
15          remove u from Q 
16          
17          for each neighbor v of u:           // where v is still in Q.
18              alt ← dist[u] + length(u, v)
19              if alt < dist[v]:               // A shorter path to v has been found
20                  dist[v] ← alt 
21                  prev[v] ← u 
22
23      return dist[], prev[]

If we are only interested in a shortest path between vertices source and target, we can terminate the search after line 15 if u = target. Now we can read the shortest path from source to target by reverse iteration:

1  S ← empty sequence
2  u ← target
3  while prev[u] is defined:                  // Construct the shortest path with a stack S
4      insert u at the beginning of S         // Push the vertex onto the stack
5      u ← prev[u]                            // Traverse from target to source
6  insert u at the beginning of S             // Push the source onto the stack
*/