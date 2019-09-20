const fetch = require("node-fetch")
exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // Helper function that processes a result to match Gatsby's node structure
  const processResult = (result, endpoint) => {
    const nodeId = createNodeId(`umbraco-result-${result.id}`)
    const nodeContent = JSON.stringify(result)
    const nodeData = Object.assign({}, result, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `UmbracoApi`,
        content: nodeContent,
        contentDigest: createContentDigest(result),
      },
    })
    return nodeData
  }

  // //Helper function to capture and process data
  // const captureResult = apiUrl => {

  // }
  // Join apiOptions with the API URL
  const apiUrl = `https://jsonplaceholder.typicode.com/posts`

  // Gatsby expects sourceNodes to return a promise
  return (
    // Fetch a response from the apiUrl
    fetch(apiUrl)
      // Parse the response as JSON
      .then(response => response.json())
      // Process the JSON data into a node
      .then(data => {
        // For each query result (or 'hit')
        data.forEach(result => {
          console.log(`posts data is:`, result)

          // Process the result data to match the structure of a Gatsby node
          const nodeData = processResult(result)
          // Use Gatsby's createNode helper to create a node from the node data
          createNode(nodeData)
        })
      })
  )
}
