import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import LoginPage from "./components/LoginPage";
import AddEditCompany from "./pages/AddEditCompany";
import Profile from "./components/Profile";
import CompanyList from "./components/CompanyList";
import ManageCompany from "./pages/ManageCompany";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setAuth={setIsAuthenticated} />}
        />

      
        {isAuthenticated ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="add-company" element={<AddEditCompany />} />
            <Route path="manage-company" element={<ManageCompany />} />
            <Route path="company-list" element={<CompanyList />} />
            <Route path="add-company/:id" element={<AddEditCompany />} />
            <Route path="*" element={<Navigate to="/" replace />} />{" "}
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
