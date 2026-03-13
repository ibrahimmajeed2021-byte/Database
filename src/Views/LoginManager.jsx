import BackButton from "../UI/BackButton";
import "./LoginManager.scss";
import "./login.scss";
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
      <BackButton />
      <h2>Manager Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <label>
          Username
          <input type="text" />
        </label>
        <label>
          Password
          <input type="password" />
        </label>
        <button className="LoginManager">Login</button>
      </form>
    </div>
  );
}

export default LoginManager;
