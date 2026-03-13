import "./LoginPatient.scss";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import BackButton from '../UI/BackButton.jsx';

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
      <BackButton />
      <h2>Patient Login</h2>
      <form className="form" onSubmit={handleLogin}>
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
