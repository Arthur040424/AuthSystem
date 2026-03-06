import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleFakeLogin = () => {
    alert("Pretending to log in...");
    // Teleport the user to the dashboard programmatically!
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleFakeLogin}>Simulate Login</button>
    </div>
  );
}

export default Login;