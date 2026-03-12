import Layout from "./layout/Layout.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Manager from "./Views/Manager.jsx";
import Clinician from "./Views/Clinician.jsx";
import Patient from "./Views/Patient.jsx";
import PageNotFound from "./Views/404.jsx";
import HomePage from "./Views/HomePage.jsx";
import Landing from "./Views/Landing.jsx";

function App() {
  const user = "manager";

  return (
    <>
      <BrowserRouter>
        <Layout user={user}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/clinician" element={<Clinician />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
