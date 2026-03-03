import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import NavBar from "./NavBar.jsx";
import "./scss/layout.scss";

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
