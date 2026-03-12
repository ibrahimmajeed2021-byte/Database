import "./Landing.scss";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <Link to="/login/manager" className="loginButton">
        <button>Log in as Manager</button>
      </Link>
      <Link to="/login/clinician" className="loginButton">
        <button>Log in as Clinican</button>
      </Link>
      <Link to="/login/patient" className="loginButton">
        <button>Log in as Patient</button>
      </Link>
    </div>
  );
}

export default Landing;
