const path = require("path");
const CracoAlias = require("craco-alias");
const CracoAntDesignPlugin = require("craco-antd");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent"); // included in Create React App
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "jsconfig",
        baseUrl: ".",
      },
    },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          "src/theme/antd-vars.less"
        ),
        cssLoaderOptions: {
          modules: {
            exportLocalsConvention: "camelCase",
            getLocalIdent: (context, localIdentName, localName, options) => {
              if (context.resourcePath.includes("node_modules")) {
                return localName;
              }
              return getCSSModuleLocalIdent(
                context,
                localIdentName,
                localName,
                options
              );
            },
          },
        },
        miniCssExtractPluginOptions: {
          ignoreOrder: true, // Enable to remove warnings about conflicting order
        },
      },
    },
  ],
  // https://github.com/DocSpring/craco-antd/issues/10
  jest: {
    configure(config) {
      config.transformIgnorePatterns = ["/node_modules/(?!antd)/.+\\.js$"];
      return config;
    },
  },
  babel: {
    plugins: [
      // https://github.com/formatjs/react-intl/issues/1511
      [
        "macros",
        {
          isMacrosName: (file) =>
            /[./]macro(\.js)?$/.test(file) &&
            file.indexOf("@formatjs/macro") === -1,
        },
      ],
    ],
  },
  webpack: {
    plugins: [
      // Silence mini-css-extract-plugin generating lots of warnings for CSS ordering.
      // We use CSS modules that should not care for the order of CSS imports, so we
      // should be safe to ignore these.
      //
      // See: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order*/,
      }),
      new AntdDayjsWebpackPlugin(),
    ],
  },
};
