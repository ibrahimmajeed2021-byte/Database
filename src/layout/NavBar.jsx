import { Link, useNavigate } from "react-router-dom";
import "./scss/NavBar.scss";

function NavBar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };
  return (
    <nav>
      <div className="NavItem">
        <Link to="/home">
          <img
            className="home"
            src="https://img.icons8.com/?size=100&id=z6m63h25vYs2&format=png&color=000000"
          />
        </Link>
      </div>
      <div className="NavItem">
        <Link to="/manager">Manager</Link>
      </div>
      <div className="NavItem">
        <Link to="/clinician">Clinician</Link>
      </div>
      <div className="NavItem">
        <Link to="/patient">Patient</Link>
      </div>
      {isLoggedIn && (
        <div className="NavItem">
          <div className="LogOut">
            <Link to="/" onClick={handleLogout}>
              Log Out
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
