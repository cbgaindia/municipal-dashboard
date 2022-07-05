const path = require('path');

module.exports = {
  images: {
    domains: ['52.208.11.94'],
    poweredByHeader: false,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  },
};
