import Layout from "./layout/Layout.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Manager from "./Views/Manager.jsx";
import Clinician from "./Views/Clinician.jsx";
import Patient from "./Views/Patient.jsx";
import PageNotFound from "./Views/404.jsx";

function App() {
  const user = "manager";

  return (
    <>
      <BrowserRouter>
        <Layout user={user}>
          <Routes>
            <Route path="/manager" element={<Manager />} />
            <Route path="/clinician" element={<Clinician />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
