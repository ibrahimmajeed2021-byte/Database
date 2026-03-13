import "./LoginClinician.scss";
import { useNavigate } from "react-router-dom";

function LoginClinician({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();

  const handleLogin = (login) => {
    login.preventDefault();
    setIsLoggedIn(true);
    setUserRole("clinician");
    navigate("/clinician");
  };

  return (
    <div className="Login">
      <h2>Clinician Login</h2>
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

export default LoginClinician;
