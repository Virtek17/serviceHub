import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ProviderDashboardPage from "./components/pages/ProviderDashboardPage";
import BrowseProvidersPage from "./components/pages/BrowseProvidersPage";
import ProviderProfilePage from "./components/pages/ProviderProfilePage";
import ProviderSetupPage from "./components/pages/ProviderSetupPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
        <Route path="/customer/browse" element={<BrowseProvidersPage />} />
        <Route
          path="/customer/provider/:id"
          element={<ProviderProfilePage />}
        />
        <Route path="/provider/setup" element={<ProviderSetupPage />} />
      </Routes>
    </div>
  );
}

export default App;
