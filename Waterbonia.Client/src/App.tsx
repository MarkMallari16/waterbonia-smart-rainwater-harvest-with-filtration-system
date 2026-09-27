
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/reset-password" element={<ResetPassword/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;