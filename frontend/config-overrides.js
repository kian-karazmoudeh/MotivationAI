module.exports = function override(config) {
  // Add fallback for crypto module
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve("crypto-browserify"),
  };

  return config;
};
