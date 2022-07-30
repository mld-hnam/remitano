import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";

import { AuthProvider } from "@/contexts/AuthContext";
import { PageLoading } from "@/components";
import { isAuthenticated } from "@/utils/account";
import { parseRoutesRecursion } from "@/utils/utils";

const delayRoute = (ms = 500) => {
  return (promise) =>
    promise.then(
      (data) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(data), ms);
        })
    );
};

/**
 * Public Route
 */

//Errors page
const page503 = {
  path: "/503",
  component: lazy(() => delayRoute()(import("@/pages/503"))),
};
const page404 = {
  path: "/404",
  component: lazy(() => delayRoute()(import("@/pages/404"))),
};
const page403 = {
  path: "/403",
  component: lazy(() => delayRoute()(import("@/pages/403"))),
};

const sharedPage = {
  path: "/share",
  name: "share",
  component: lazy(() => delayRoute()(import("@/modules/share"))),
};

/**
 * Private Route
 */
const dashboard = {
  path: "/",
  name: "Home",
  component: lazy(() =>
    delayRoute()(import("@/modules/dashboard/features/dasboard-page"))
  ),
};

const publicRoutesData = [dashboard, page404, page503, page403];
const privateRoutes = [dashboard, page404, page503, sharedPage];

const RequireAuth = ({ children }) => {
  const location = useLocation();

  return isAuthenticated() ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

/**
 *  Parse render Route
 */

const { array: dataPrivateRoute } = parseRoutesRecursion(privateRoutes);

const PublicRoutes = () => {
  return publicRoutesData.map((route, index) => {
    const { component: Component, path, ...rest } = route;
    return (
      <Route
        {...rest}
        key={`public-route-${index}`}
        path={path}
        element={
          <Suspense fallback={<PageLoading />}>
            <Component />
          </Suspense>
        }
        exact
      />
    );
  });
};

const PrivateRoutes = () => {
  return dataPrivateRoute.map((route, index) => {
    const { component: Component, path, ...rest } = route;
    return (
      <Route
        {...rest}
        key={`private-route-${index}`}
        path={path}
        element={
          <Suspense fallback={<PageLoading />}>
            <RequireAuth>
              <Component />
            </RequireAuth>
          </Suspense>
        }
      />
    );
  });
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {PublicRoutes()}
          {PrivateRoutes()}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
