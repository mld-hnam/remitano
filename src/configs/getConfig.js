import staticConfig from "./static.config";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => ({ ...staticConfig, ...window.dynamicConfig });
