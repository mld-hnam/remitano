import React from "react";

import ConfigContext from "./ConfigContext";

export default function ConfigProvider({ children, getConfig }) {
  const contextValue = React.useMemo(getConfig, [getConfig]);
  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  );
}
