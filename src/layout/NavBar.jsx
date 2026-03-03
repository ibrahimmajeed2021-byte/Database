import { Link } from "react-router-dom";
import "./scss/NavBar.scss";

function NavBar() {
  return (
    <nav>
      <div className="NavItem">
        <Link to="/manager">Manager</Link>
      </div>
      <div className="NavItem">
        <Link to="/clinician">Clinician</Link>
      </div>
      <div className="NavItem">
        <Link to="/patient">Patient</Link>
      </div>
    </nav>
  );
}

export default NavBar;
