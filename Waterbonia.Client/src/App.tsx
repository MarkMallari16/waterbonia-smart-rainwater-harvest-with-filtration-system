import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("Loading...");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("https://localhost:7105/api/test")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                setMessage(data.message);
            })
            .catch(error => {
                console.error("API Error:", error);
                setError(error.message);
            });
    }, []);

    return (
        <div>
            <h1>Waterbonia</h1>

            <p>{message}</p>

            {error && (
                <p style={{ color: "red" }}>
                    API Error: {error}
                </p>
            )}
        </div>
    );
}

export default App;