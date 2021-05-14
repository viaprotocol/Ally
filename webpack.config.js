const webpackMerge = require('webpack-merge');
const commonConfig = require('./build/webpack.common.config');

const configs = {
  dev: require('./build/webpack.dev.config'),
  pro: require('./build/webpack.pro.config'),
};

const config = (env) => {
  if (env.config) {
    return webpackMerge.merge(commonConfig, configs[env.config]);
  }

  return commonConfig;
};

module.exports = config;
