const fetch = require("node-fetch")
exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  const { source } = configOptions
  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  //strips special characters and makes string camelcase
  const customFormat = str => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
      .replace(/\s+/g, "")
  }

  // Helper function that processes a result to match Gatsby's node structure
  const processResult = (result, endpoint) => {
    const nodeId = createNodeId(`umbraco-result-${result.id}`)
    const nodeContent = JSON.stringify(result)
    const nodeData = Object.assign({}, result, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `UmbracoApi${customFormat(endpoint)}`,
        content: nodeContent,
        contentDigest: createContentDigest(result),
      },
    })
    return nodeData
  }

  const sources = []
  configOptions.endpoints.forEach(endpoint =>
    sources.push(
      fetch(`${source}/${endpoint}`)
        .then(response => response.json())
        .then(data => {
          Array.isArray(data)
            ? data.forEach(result => {
                const nodeData = processResult(result, endpoint)
                createNode(nodeData)
              })
            : createNode(processResult(data, endpoint))
        })
    )
  )

  return Promise.all(sources)
}
