const path = require("path");

const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isEnvTest = env === "test";
const isEnvProduction = env === "production";
const isEnvDevelopment = !isEnvTest && !isEnvProduction;

const PACKAGE_LIBRARY = "library";
const PACKAGE_APPLICATION = "application";
const packageTypes = [PACKAGE_LIBRARY, PACKAGE_APPLICATION];

module.exports = (api, { type = PACKAGE_LIBRARY } = {}) => {
  if (!packageTypes.includes(type)) {
    throw new Error(
      `babel-preset-codecademy: option 'type' should be one of: ${[
        PACKAGE_LIBRARY,
        PACKAGE_APPLICATION,
      ].join(", ")}, received ${type}`
    );
  }

  let absoluteRuntimePath;
  if (type === PACKAGE_APPLICATION) {
    absoluteRuntimePath = path.dirname(
      require.resolve("@babel/runtime/package.json")
    );
  }

  return {
    presets: [
      isEnvTest && [
        require("@babel/preset-env").default,
        {
          targets: {
            node: "current",
          },
        },
      ],
      (isEnvProduction || isEnvDevelopment) && [
        require("@babel/preset-env").default,
        {
          useBuiltIns: "entry",
          corejs: 3,
          exclude: ["transform-typeof-symbol"],
        },
      ],
      [
        require("@babel/preset-react").default,
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment || isEnvTest,
        },
      ],
    ].filter(Boolean),
    plugins: [
      [require("@babel/plugin-proposal-decorators"), { legacy: true }],
      require("@babel/plugin-proposal-do-expressions"),
      require("@babel/plugin-proposal-export-default-from"),
      require("@babel/plugin-syntax-import-meta"),
      [
        require("@babel/plugin-transform-runtime").default,
        {
          corejs: false,
          regenerator: true,
          helpers: type === PACKAGE_APPLICATION,
          regenerator: true,
          useESModules: isEnvDevelopment || isEnvProduction,
          // Undocumented: ensures that the correct runtime version is used
          // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
          absoluteRuntime: absoluteRuntimePath,
        },
      ],
      require("babel-plugin-react-anonymous-display-name").default,
      // class { handleClick = () => { } }
      // Enable loose mode to use assignment instead of defineProperty
      // See discussion in https://github.com/facebook/create-react-app/issues/4263
      [
        require("@babel/plugin-proposal-class-properties").default,
        {
          loose: true,
        },
      ],
      // Optional chaining and nullish coalescing are supported in @babel/preset-env,
      // but not yet supported in webpack due to support missing from acorn.
      // These can be removed once webpack has support.
      // See https://github.com/facebook/create-react-app/issues/8445#issuecomment-588512250
      require("@babel/plugin-proposal-optional-chaining").default,
      require("@babel/plugin-proposal-nullish-coalescing-operator").default,
    ].filter(Boolean),
  };
};
