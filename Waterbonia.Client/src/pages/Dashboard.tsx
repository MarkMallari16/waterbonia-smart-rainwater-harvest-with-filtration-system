import { useEffect, useState } from "react";

const Dashboard = () => {

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
        <div>Dashboard</div>
    )
}

export default Dashboard