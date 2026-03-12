import { Link, useNavigate } from "react-router-dom";
import "./scss/NavBar.scss";

function NavBar({ isLoggedIn, onLogout, userRole }) {
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
            alt="Home"
          />
        </Link>
      </div>

      {userRole === "manager" && (
        <div className="NavItem">
          <Link to="/manager">Manager</Link>
        </div>
      )}

      {(userRole === "manager" || userRole === "clinician") && (
        <div className="NavItem">
          <Link to="/clinician">Clinician</Link>
        </div>
      )}

      {isLoggedIn && (
        <div className="NavItem">
          <Link to="/patient">Patient</Link>
        </div>
      )}

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
