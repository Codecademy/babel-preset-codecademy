const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isEnvTest = env === 'test';
const isEnvProduction = env === 'production';
const isEnvDevelopment = !isEnvTest && !isEnvProduction;

module.exports = {
  presets: [
    'react-app',
    [require('babel-preset-stage-1'), {
      decoratorsLegacy: true
    }],
  ]
}
