import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import DashLayout from "./components/DashLayout";

import Public from "./pages/Public/Public";
import Login from "./pages/auth/login/Login";
import PersistLogin from "./pages/auth/login/PersistLogin";
//import RequireAuth from "./pages/auth/login/RequireAuth";
//import { ROLES } from "./config/roles";
import Dashboard from "./pages/dashboard/Dashboard";
import EmployeeProfile from "./pages/employee/employeeProfile";
import FleetRecords from "./pages/fleets/FleetRecords";

import UsersList from "./pages/users/UsersList";
import EditUser from "./pages/users/EditUser";

const App = () => {
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route index element={<Public />} />
            <Route path="/login" element={<Login />} />
            {/* Protected Routes */}
            <Route element={<PersistLogin />}>
              {/* Admin Routes */}
              
                <Route path="/dashboard" element={<DashLayout />}>
                  <Route index="dashboard" element={<Dashboard />} />
                  <Route path="employee" element={<EmployeeProfile />} />
                  <Route path="vehicle_records" element={<FleetRecords />} />

                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                  </Route>
                </Route>
              
            </Route>{" "}
            {/* End Protected Routes */}
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
