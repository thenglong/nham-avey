/* eslint-disable */
const { merge } = require("webpack-merge")

module.exports = (config, context) => {
  return merge(config, {
    module: {
      rules: [
        {
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
        },
      ],
    },
  })
}
