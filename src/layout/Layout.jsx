import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import NavBar from "./NavBar.jsx";
import "./scss/layout.scss";

function Layout({ children, isLoggedIn, onLogout }) {
  return (
    <div className="layout">
      <Header />
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
