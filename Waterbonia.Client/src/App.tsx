
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import WaterMonitoring from "./pages/WaterMonitoring";
import Profile from "./pages/Profile"
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/water-monitoring" element={<WaterMonitoring />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/reset-password" element={<ResetPassword/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;