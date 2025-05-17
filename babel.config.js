module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@babel/preset-flow',
  ],
  plugins: [
    'babel-plugin-react-native-web',
  ],
  env: {
    production: {
      plugins: [
        'babel-plugin-react-native-web',
        'transform-remove-console',
      ],
    },
  },
}; 