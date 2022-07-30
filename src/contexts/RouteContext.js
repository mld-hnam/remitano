import { createContext, useContext } from "react";

const RouteContext = createContext();

const useRouteContext = () => useContext(RouteContext);

export { useRouteContext };

export default RouteContext;
