import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import ProviderDashboardPage from "./pages/ProviderDashboardPage";
import CustomerBrowsePage from "./pages/CustomerBrowsePage";
import ProviderProfilePage from "./pages/ProviderProfilePage";
import ProviderSetupPage from "./pages/ProviderSetupPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/provider/dashboard"
            element={<ProviderDashboardPage />}
          />
          <Route path="/customer/browse" element={<CustomerBrowsePage />} />
          <Route
            path="/customer/provider/:id"
            element={<ProviderProfilePage />}
          />
          <Route path="/provider/setup" element={<ProviderSetupPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
