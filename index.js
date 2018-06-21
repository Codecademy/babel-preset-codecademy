module.exports = {
  presets: [
    require('babel-preset-env').default(null, {
      debug: false,
      modules: 'commonjs',
      targets: {
        android: 30,
        chrome: 35,
        edge: 14,
        explorer: 11,
        firefox: 52,
        safari: 9
      }
    }),
    require('babel-preset-stage-0'),
    require('babel-preset-react')
  ],
  plugins: [
    [require('babel-plugin-transform-es2015-template-literals'), {
      spec: true
    }],
    require('babel-plugin-transform-es5-property-mutators'),
    require('babel-plugin-transform-es3-member-expression-literals'),
    require('babel-plugin-transform-decorators-legacy').default,
    require('babel-plugin-transform-es3-property-literals'),
    require('babel-plugin-transform-jscript'),
  ]
}
