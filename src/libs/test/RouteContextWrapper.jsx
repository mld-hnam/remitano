import RouteContext from '../routes/RouteContext';

export default function RouteContextWrapper({ children }) {
  return (
    <RouteContext.Provider value={{ breadcrumbMap: {} }}>
      {children}
    </RouteContext.Provider>
  );
}
