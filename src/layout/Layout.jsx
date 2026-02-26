import Header from "./Header.jsx";
import Form from "../UI/Form.jsx";
import Footer from "./Footer.jsx";
import "./scss/layout.scss";

function Layout({ props }) {
	return (
		<div className="layout">
			<Header />
			<main>
				Logged in as {props}
				<p>Add a Patient</p>
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
