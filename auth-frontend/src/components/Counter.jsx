import { useState } from "react"; // 1. Import the hook

function Counter() {
  // 2. Initialize State
  const [count, setCount] = useState(0);
  // count = the current value (starts at 0)
  // setCount = the function we call to update the value

  return (
    <div style={{ padding: "20px", border: "2px dashed blue", margin: "10px" }}>
      <h2>Current Count: {count}</h2>

      {/* 3. Update the state when the button is clicked */}
      <button onClick={() => setCount(count + 1)}>
        Add 1
      </button>
    </div>
  );
}

export default Counter;