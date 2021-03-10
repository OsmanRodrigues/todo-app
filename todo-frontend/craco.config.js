/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@models': path.resolve(__dirname, 'src/models/'),
      '@styles': path.resolve(__dirname, 'src/styles/')
    }
  }
};
