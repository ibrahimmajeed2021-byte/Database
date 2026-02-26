import "./scss/NavBar.scss";

function NavBar() {
  return (
    <nav>
      <div className="NavItem">
        <a>Manager</a>
      </div>
      <div className="NavItem">
        <a>Clinician</a>
      </div>
      <div className="NavItem">
        <a>Patient</a>
      </div>
    </nav>
  );
}

export default NavBar;
