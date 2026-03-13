import "./Landing.scss";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="Landing">
      <Link to="/login/manager" className="loginButton">
        <button className="LandingButton">Log in as Manager</button>
      </Link>
      <Link to="/login/clinician" className="loginButton">
        <button className="LandingButton">Log in as Clinican</button>
      </Link>
      <Link to="/login/patient" className="loginButton">
        <button className="LandingButton">Log in as Patient</button>
      </Link>
    </div>
  );
}

export default Landing;
