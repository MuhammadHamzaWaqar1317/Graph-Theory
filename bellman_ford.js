/**
 * ---------------------------------------------------------
 * Assignment 02: Bellman-Ford Algorithm Implementation
 * ---------------------------------------------------------
 * Language: JavaScript (Node.js)
 *
 *
 *
 * Author: Muhammad Hamza Waqar Ali
 * Date: 02 March 2026
 *
 * How to Run:
 * 1. Save as bellmanFord.js
 * 2. Open terminal in the file directory
 * 3. Run: node bellmanFord.js
 * ---------------------------------------------------------
 */

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log("\n--- Bellman-Ford Algorithm ---\n");

  const no_of_nodes = Number(await ask("Enter the number of nodes: "));
  const nodes = [];
  const graph = {};

  // Step 1: Input Node Names
  for (let i = 0; i < no_of_nodes; i++) {
    const name = await ask("Enter Node name: ");
    nodes.push({ name, distance: Infinity });
  }

  // Step 2: Input Edges (Adjacency List Style)
  for (let i = 0; i < no_of_nodes; i++) {
    const node = nodes[i];
    const no_of_edges = Number(
      await ask(`Enter the number of edges for node ${node.name}: `),
    );

    graph[node.name] = [];

    for (let j = 0; j < no_of_edges; j++) {
      const node_name = await ask(
        `Enter the name of node connected to ${node.name}: `,
      );

      const weight = Number(await ask(`Enter the weight of edge ${j + 1}: `));

      graph[node.name].push({
        src: node.name,
        dest: node_name,
        weight,
      });
    }
  }

  // Step 3: Take Start Node From User
  const start_node_name = await ask("Enter the name of the start node: ");
  const start_node = nodes.find((n) => n.name === start_node_name);

  if (!start_node) {
    console.log("Invalid start node.");
    rl.close();
    return;
  }

  // Initialize distances
  for (let node of nodes) {
    node.distance = Infinity;
  }

  start_node.distance = 0;

  // Step 4: Convert Adjacency List to Edge List
  const edges = [];
  for (let nodeName in graph) {
    for (let edge of graph[nodeName]) {
      edges.push(edge);
    }
  }

  // Step 5: Relax edges V-1 times
  for (let i = 0; i < no_of_nodes - 1; i++) {
    for (let edge of edges) {
      const srcNode = nodes.find((n) => n.name === edge.src);
      const destNode = nodes.find((n) => n.name === edge.dest);

      if (
        srcNode.distance !== Infinity &&
        srcNode.distance + edge.weight < destNode.distance
      ) {
        destNode.distance = srcNode.distance + edge.weight;
      }
    }
  }

  // Step 6: Detect Negative Cycle
  for (let edge of edges) {
    const srcNode = nodes.find((n) => n.name === edge.src);
    const destNode = nodes.find((n) => n.name === edge.dest);

    if (
      srcNode.distance !== Infinity &&
      srcNode.distance + edge.weight < destNode.distance
    ) {
      console.log("\nNegative cycle detected");
      rl.close();
      return;
    }
  }

  console.log(
    `\nShortest distances from source vertex (${start_node.name}):\n`,
  );

  for (let node of nodes) {
    if (node.distance === Infinity) {
      console.log(`${node.name}: Infinity`);
    } else {
      console.log(`${node.name}: ${node.distance}`);
    }
  }

  rl.close();
}

main();
