import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
    const [message, setMessage] = useState("Loading...");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTestMessage = async () => {
            try {
                const response = await fetch("https://localhost:7105/api/test");

                if (!response.ok) {
                    throw new Error("Failed to fetch data.");
                }

                const data = await response.json();

                setMessage(data.message);
            } catch (err) {
                setError("Something went wrong.")
            }
        };

        fetchTestMessage();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;