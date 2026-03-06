import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// IMport our new page components
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    // BrowserRouter wraps the whole app too enable routing
    <BrowserRouter>
      {/* This is our Navigation Bar. It sits outside of <Routes>, so it will always be visible on every page! */}
      <nav style={{ padding: "10px", background: "#f0f0f0", marginBottom: "20px" }}>
        {/* We use <Link> instead of <a href="..."> so the page does not refresh! */}
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
        <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
        <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
      </nav>

      {/* Routes is the "dynamic" area where the actual page content is swapped in and out */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;