/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-rest-api",
      options: {
        key: "<YOUR_API_KEY_HERE>",
        endpoints: [
          "https://jsonplaceholder.typicode.com/posts",
          "https://jsonplaceholder.typicode.com/users",
        ],
      },
    },
  ],
}
