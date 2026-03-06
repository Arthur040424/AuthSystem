import { useState } from "react";

function MiniForm() {
  // State to hold whatever the user types
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing when we submit
    alert(`You submitted the email ${email}`);
  };

  return (
    <div style={{ padding: "20px", border: "2px solid green", margin: "10px" }}>
      <h2>Test Form</h2>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" 
        // The values is forcing the input to display exactly what is in our state
          value={email} 
          // e.target.value gets the actual text the user just pressed on the keyboard
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{ marginLeft: "10px" }}
          />

          <button type="submit" style={{ marginLeft: "10px" }}>Submit</button>
      </form>

      {/* Let's show the live state right on the screen! */}
      <p>Live typing preview: <strong>{email}</strong></p>
    </div>
  );
}

export default MiniForm;