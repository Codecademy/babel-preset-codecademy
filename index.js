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
