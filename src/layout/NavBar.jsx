import "./scss/NavBar.scss";

function NavBar() {
  return (
    <nav>
      <div className="NavItem">
        <button onClick={() => {}}>Manager</button> 
      </div>
      <div className="NavItem">
        <button onClick={() => {}}>Clinician</button>
      </div>
      <div className="NavItem">
        <button onClick={() => {}}>Patient</button>
      </div>
    </nav>
  );
}

export default NavBar;