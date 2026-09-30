
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import WaterMonitoring from "./pages/WaterMonitoring";
import Rainfall from "./pages/Rainfall";
import Profile from "./pages/Profile"
import PumpControl from "./pages/PumpControl";
import WaterQuality from "./pages/WaterQuality";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/layout/DashboardLayout";
import AuthCallback from "./pages/auth/AuthCallback";

function App() {

    return (
        <Routes>
            {/*Authentication */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Dashboard */}
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/water-monitoring" element={<WaterMonitoring />} />
                <Route path="/rainfall" element={<Rainfall />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/pump-control" element={<PumpControl />} />
                <Route path="/water-quality" element={<WaterQuality />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
        </Routes>

    );
}

export default App;