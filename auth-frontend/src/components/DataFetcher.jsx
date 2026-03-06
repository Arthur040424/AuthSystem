import { useState, useEffect } from "react";

function DataFetcher() {
  const [data, setData] = useState("Loading...");

  // useEffect takes two arguments
  // 1. A function to run
  // 2. A dependency array (when should it run?)
  useEffect(() => {
    console.log("The component just appeared on the screen!");

    // Let's assume we are fetching data from an API that takes 2 seconds
    setTimeout(() => {
      setData("Data successfully loaded from API!");
    }, 2000);
  }, []); // <-- IMPORTANT: An empty array means "Run this exactly ONCE when the component first loads"

  return (
    <div style={{ padding: "20px", border: "2px solid purple", margin: "10px" }}>
      <h2>useEffect Test</h2>
      <p>{data}</p>
    </div>
  );
}

export default DataFetcher;