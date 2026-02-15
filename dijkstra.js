const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  const no_of_nodes = Number(await ask("Enter the number of nodes: "));
  const nodes = [];
  const graph = {};

  for (let index = 0; index < no_of_nodes; index++) {
    const name = await ask("Enter Node name: ");
    const value = Infinity;
    nodes.push({ name, value });
  }

  for (let index = 0; index < no_of_nodes; index++) {
    const node = nodes[index];
    const no_of_edges = Number(
      await ask(`Enter the number of edges for node ${node.name}: `),
    );
    graph[node.name] = [];
    for (let edge_index = 0; edge_index < no_of_edges; edge_index++) {
      const node_name = await ask(
        `Enter the name of node connected to ${node.name}: `,
      );
      const connected_node = nodes.find((n) => n.name === node_name);
      const edge_weight = Number(
        await ask(`Enter the weight of edge ${edge_index + 1}: `),
      );
      graph[node.name].push({ node: connected_node, weight: edge_weight });
    }
  }
  console.log(graph);

  const start_node_name = await ask("Enter the name of the start node: ");
  const start_node = nodes.find((n) => n.name === start_node_name);
  start_node.value = 0;
  const visited = new Set();

  while (visited.size < nodes.length) {
    const current = nodes
      .filter((n) => !visited.has(n.name))
      .reduce((min, n) => (n.value < min.value ? n : min));

    visited.add(current.name);

    for (const edge of graph[current.name]) {
      const newDist = current.value + edge.weight;
      if (newDist < edge.node.value) {
        edge.node.value = newDist;
      }
    }
  }

  console.log("Shortest distances from", start_node.name);
  let totalCost = 0;
  for (const node of nodes) {
    console.log(`${node.name}: ${node.value}`);
    if (node.value !== Infinity) {
      totalCost += node.value;
    }
  }
  console.log(`\nTotal cost from visited nodes: ${totalCost}`);
  console.log("Visited order:", [...visited].join(" -> "));

  rl.close();
}

main();
