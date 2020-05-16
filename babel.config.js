module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    [
      'module-resolver',
      {
        alias: {
          '@assets': './assets',
          '@': './src',
        },
        root: ['.'],
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.json', '.png'],
      },
    ],
  ],
};
