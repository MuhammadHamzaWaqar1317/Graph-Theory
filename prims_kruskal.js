/**
 * ---------------------------------------------------------
 * Assignment 03: Prims-Kruskal Algorithm Implementation
 * ---------------------------------------------------------
 * Language: JavaScript (Node.js)
 *
 *
 *
 * Author: Muhammad Hamza Waqar Ali
 * Date: 09 March 2026
 *
 * How to Run:
 * 1. Save as prims_kruskal.js
 * 2. Open terminal in the file directory
 * 3. Run: node prims_kruskal.js
 * ---------------------------------------------------------
 */

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// ---------------- PRIM'S ALGORITHM ----------------
function primMST(graph, start) {
  const visited = new Set();
  const edges = [];
  const mst = [];

  visited.add(start);

  graph[start].forEach((edge) => edges.push(edge));

  while (edges.length > 0) {
    edges.sort((a, b) => a.weight - b.weight);

    const smallest = edges.shift();

    if (!visited.has(smallest.dest)) {
      visited.add(smallest.dest);
      mst.push(smallest);

      graph[smallest.dest].forEach((edge) => {
        if (!visited.has(edge.dest)) {
          edges.push(edge);
        }
      });
    }
  }

  console.log("\nPrim's Minimum Spanning Tree:");
  mst.forEach((e) => {
    console.log(`${e.src} - ${e.dest} : ${e.weight}`);
  });
}

// ---------------- KRUSKAL'S ALGORITHM ----------------
function kruskalMST(graph, nodes) {
  const edges = [];

  for (let node in graph) {
    graph[node].forEach((e) => edges.push(e));
  }

  edges.sort((a, b) => a.weight - b.weight);

  const parent = {};

  nodes.forEach((n) => {
    parent[n.name] = n.name;
  });

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x, y) {
    parent[find(x)] = find(y);
  }

  const mst = [];

  edges.forEach((edge) => {
    const root1 = find(edge.src);
    const root2 = find(edge.dest);

    if (root1 !== root2) {
      mst.push(edge);
      union(root1, root2);
    }
  });

  console.log("\nKruskal's Minimum Spanning Tree:");
  mst.forEach((e) => {
    console.log(`${e.src} - ${e.dest} : ${e.weight}`);
  });
}

// ---------------- MAIN PROGRAM ----------------
async function main() {
  const no_of_nodes = Number(await ask("Enter the number of nodes: "));
  const nodes = [];
  const graph = {};

  // Step 1: Input Node Names
  for (let i = 0; i < no_of_nodes; i++) {
    const name = await ask("Enter Node name: ");
    nodes.push({ name, distance: Infinity });
  }

  // Step 2: Input Edges
  for (let i = 0; i < no_of_nodes; i++) {
    const node = nodes[i];

    const no_of_edges = Number(
      await ask(`Enter number of edges for node ${node.name}: `),
    );

    graph[node.name] = [];

    for (let j = 0; j < no_of_edges; j++) {
      const node_name = await ask(`Enter the node connected to ${node.name}: `);

      const weight = Number(await ask(`Enter the weight of edge ${j + 1}: `));

      graph[node.name].push({
        src: node.name,
        dest: node_name,
        weight,
      });
    }
  }

  // Step 3: Start Node
  const start_node_name = await ask("Enter the name of the start node: ");
  const start_node = nodes.find((n) => n.name === start_node_name);

  if (!start_node) {
    console.log("Invalid start node.");
    rl.close();
    return;
  }

  // Run Algorithms
  primMST(graph, start_node_name);
  kruskalMST(graph, nodes);

  rl.close();
}

main();
