import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    // Determine API URL based on environment
    const determineApiUrl = () => {
      // If we're in development or have a VITE_API_URL set
      if (import.meta.env.DEV || import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL || "http://localhost:5077";
      }
      
      // If we're in production, use the current hostname with port 5077
      // This works because frontend and API are on same host but different ports
      return `${window.location.protocol}//${window.location.hostname}:5077`;
    };

    const url = determineApiUrl();
    setApiUrl(url); // For debugging

    fetch(`${url}/items`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setItems(data))
      .catch(err => {
        console.error("API Error:", err);
        console.log("Trying API URL:", url);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Item List - for publish</h1>
      {apiUrl && <p style={{ color: 'gray', fontSize: '12px' }}>API: {apiUrl}</p>}
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      {items.length === 0 && <p>No items found or loading...</p>}
    </div>
  );
}

export default App;