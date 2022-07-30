import React from "react";

import ConfigContext from "./ConfigContext";

export default function useConfig() {
  return React.useContext(ConfigContext);
}
