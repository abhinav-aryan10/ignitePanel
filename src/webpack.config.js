// webpack.config.js
const path = require('path');

module.exports = {
  // ... other webpack config options ...

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // ... your babel options ...
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      // Create an alias to exclude test files from being resolved
      // Adjust the path based on your project structure
      // This assumes your test files have the .test.js extension
      'src': path.resolve(__dirname, 'src'),
    },
  },

  // ... other webpack config options ...
};
