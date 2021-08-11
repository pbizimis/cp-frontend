/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-plugin-postcss",
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        reportOnly: false,
        mergeScriptHashes: false,
        mergeStyleHashes: false,
        mergeDefaultDirectives: false,
        directives: {
          "default-src": "'self' data: blob: 'unsafe-inline' 'unsafe-eval' https://webdesigan.com https://auth.webdesigan.com https://images.webdesigan.com https://api.webdesigan.com",
        }
      }
    }
  ],
}
