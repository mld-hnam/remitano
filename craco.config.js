const path = require("path");
const CracoAlias = require("craco-alias");
const CracoAntDesignPlugin = require("craco-antd");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent"); // included in Create React App

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
      },
    },
  ],
};
