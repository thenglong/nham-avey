const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

// Copy from node_modules/@nrwl/react/plugins/webpack with "@nrwl/react": "14.4.3"
// https://github.com/nrwl/nx/blob/master/packages/react/plugins/webpack.ts
// Add React-specific configuration
function getWebpackConfig(config, context) {
  config.module.rules.push({
    test: /\.svg$/,
    oneOf: [
      // If coming from JS/TS or MDX file, then transform into React component using SVGR.
      {
        issuer: /\.(js|ts|md)x?$/,
        use: [
          {
            loader: require.resolve("@svgr/webpack"),
            options: {
              svgo: false,
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000, // 10kB
              name: "[name].[hash:7].[ext]",
              esModule: false,
            },
          },
        ],
      },
      // Fallback to plain URL loader.
      {
        use: [
          {
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000, // 10kB
              name: "[name].[hash:7].[ext]",
            },
          },
        ],
      },
    ],
  })

  /***** start modifying*/
  config.module.rules.push({
    test: /\.less$/i,
    use: [
      {
        loader: "less-loader", // compiles Less to CSS
        options: {
          lessOptions: {
            modifyVars: {
              "primary-color": "#1DA57A",
              "link-color": "#1DA57A",
              "border-radius-base": "8px",
            },
            javascriptEnabled: true,
          },
        },
      },
    ],
  })
  /***** modifying **/

  if (config.mode === "development" && config["devServer"]?.hot) {
    // add `react-refresh/babel` to babel loader plugin
    const babelLoader = config.module.rules.find(
      rule => typeof rule !== "string" && rule.loader?.toString().includes("babel-loader")
    )
    if (babelLoader && typeof babelLoader !== "string") {
      babelLoader.options["plugins"] = [
        ...(babelLoader.options["plugins"] || []),
        [
          require.resolve("react-refresh/babel"),
          {
            skipEnvCheck: true,
          },
        ],
      ]
    }
    // add https://github.com/pmmmwh/react-refresh-webpack-plugin to webpack plugin
    config.plugins.push(new ReactRefreshPlugin())
  }

  return config
}

module.exports = getWebpackConfig
