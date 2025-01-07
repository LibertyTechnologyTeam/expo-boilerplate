module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // more plugins
      'react-native-reanimated/plugin',
    ],
  };
};
