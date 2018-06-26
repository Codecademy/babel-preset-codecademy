module.exports = {
  presets: [
    [require('babel-preset-env').default, {
      debug: false,
      modules: false,
    }],
    require('babel-preset-stage-0'),
    require('babel-preset-react')
  ],
  plugins: [
    require('babel-plugin-transform-decorators-legacy').default,
  ]
}
