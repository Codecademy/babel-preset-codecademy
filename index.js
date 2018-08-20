const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isEnvTest = env === "test";
const isEnvProduction = env === "production";
const isEnvDevelopment = !isEnvTest && !isEnvProduction;

module.exports = () => ({
  presets: [
    isEnvTest && [
      require("@babel/preset-env").default,
      {
        targets: {
          node: "current"
        }
      }
    ],
    (isEnvProduction || isEnvDevelopment) && [
      require("@babel/preset-env").default,
      {
        useBuiltIns: "entry",
        modules: false
      }
    ],
    require("@babel/preset-react").default
  ].filter(Boolean),
  plugins: [
    require("@babel/plugin-transform-destructuring").default,
    [
      require("@babel/plugin-proposal-class-properties").default,
      {
        loose: true
      }
    ],
    [
      require("@babel/plugin-proposal-object-rest-spread").default,
      {
        useBuiltIns: true
      }
    ],
    require("@babel/plugin-proposal-decorators"),
    require("@babel/plugin-proposal-export-default-from"),
    require("@babel/plugin-proposal-export-namespace-from"),
    require("@babel/plugin-syntax-import-meta"),
    [
      require("@babel/plugin-transform-runtime").default,
      {
        helpers: false,
        polyfill: false,
        regenerator: true
      }
    ],
    !isEnvTest && [
      require("@babel/plugin-transform-regenerator").default,
      {
        // Async functions are converted to generators by @babel/preset-env
        async: false
      }
    ],
    require("@babel/plugin-syntax-dynamic-import").default,
    isEnvTest &&
      // Transform dynamic import to require
      require("babel-plugin-transform-dynamic-import").default
  ].filter(Boolean)
});
