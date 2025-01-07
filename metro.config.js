// Learn more https://docs.expo.io/guides/customizing-metro
// metro.config.js
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = wrapWithReanimatedMetroConfig(config);