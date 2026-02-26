import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "./layout.scss";

function Layout() {
	return (
		<div className="layout">
			<Header />
			<main>Hello World!</main>
			<Footer />
		</div>
	);
}

export default Layout;
