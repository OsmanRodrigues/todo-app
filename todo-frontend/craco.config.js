/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@styles': path.resolve(__dirname, 'src/styles/')
    }
  }
};
