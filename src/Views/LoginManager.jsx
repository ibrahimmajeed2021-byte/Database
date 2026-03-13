import "./LoginManager.scss";
import { useNavigate } from "react-router-dom";

function LoginManager({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();

  const handleLogin = (login) => {
    login.preventDefault();
    setIsLoggedIn(true);
    setUserRole("manager");
    navigate("/manager");
  };

  return (
    <div className="Login">
      <h2>Manager Login</h2>
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

export default LoginManager;
