
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import WaterMonitoring from "./pages/WaterMonitoring";
import Rainfall from "./pages/Rainfall";
import Profile from "./pages/Profile"
import PumpControl from "./pages/PumpControl";
import WaterQuality from "./pages/WaterQuality";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/water-monitoring" element={<WaterMonitoring />} />
                    <Route path="/rainfall" element={<Rainfall />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/pump-control" element={<PumpControl />} />
                    <Route path="/water-quality" element={<WaterQuality />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="/reset-password" element={<ResetPassword/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;