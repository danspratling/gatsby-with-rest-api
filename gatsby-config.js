/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-umbraco",
      options: {
        key: "<YOUR_API_KEY_HERE>",
        source: "https://jsonplaceholder.typicode.com",
        endpoints: ["posts", "users"],
      },
    },
  ],
}
