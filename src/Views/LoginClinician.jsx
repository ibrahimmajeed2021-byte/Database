import "./LoginClinician.scss";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import BackButton from "../UI/BackButton.jsx";

// testing if the merge will work
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
      <BackButton />
      <h2>Clinician Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <label>
          Username
          <input type="text" />
        </label>
        <label>
          Password
          <input type="password" />
        </label>
        <button className="LoginClinician">Login</button>
      </form>
    </div>
  );
}

export default LoginClinician;
