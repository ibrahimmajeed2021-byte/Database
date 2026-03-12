import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import NavBar from "./NavBar.jsx";
import "./scss/layout.scss";

function Layout({ children, isLoggedIn, onLogout, userRole }) {
  return (
    <div className="layout">
      <Header />
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} userRole={userRole} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
