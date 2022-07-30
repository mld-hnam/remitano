import { matchRoutes, useLocation } from "react-router-dom";

export const useCurrentPath = (routes) => {
  const location = useLocation();

  const [{ route }] = matchRoutes(routes, location);

  return { currentPath: route.path, location };
};
