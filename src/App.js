import AppRoutes from "./configs/routes.config";
import { IntlProvider } from "react-intl";
import enEN from "@/locales/en-EN";

function App() {
  return (
    <IntlProvider locale="en" messages={{ ...enEN }}>
      <AppRoutes />
    </IntlProvider>
  );
}

export default App;
