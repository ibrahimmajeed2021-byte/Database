import "./LoginPatient.scss";
import { useNavigate } from "react-router-dom";

function LoginPatient({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();

  const handleLogin = (login) => {
    login.preventDefault();
    setIsLoggedIn(true);
    setUserRole("patient");
    navigate("/patient");
  };

  return (
    <div className="Login">
      <h2>Patient Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username
          <input type="text" />
        </label>
        <label>
          Password
          <input type="password" />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPatient;
