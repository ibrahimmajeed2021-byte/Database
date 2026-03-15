import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Manager from "./Views/Manager.jsx";
import Clinician from "./Views/Clinician.jsx";
import Patients from "./Views/Patients.jsx";
import PageNotFound from "./Views/404.jsx";
import HomePage from "./Views/HomePage.jsx";
import Landing from "./Views/Landing.jsx";
import LoginManager from "./Views/LoginManager.jsx";
import LoginClinician from "./Views/LoginClinician.jsx";
import LoginPatient from "./Views/LoginPatient.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <>
      <BrowserRouter>
        <Layout
          isLoggedIn={isLoggedIn}
          userRole={userRole}
          onLogout={handleLogout}
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/manager"
              element={
                isLoggedIn && userRole === "manager" ? (
                  <Manager />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/clinician"
              element={
                isLoggedIn &&
                (userRole === "manager" || userRole === "clinician") ? (
                  <Clinician />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/patient"
              element={
                isLoggedIn ? (
                  <Patients userRole={userRole} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/login/manager"
              element={
                <LoginManager
                  setIsLoggedIn={setIsLoggedIn}
                  setUserRole={setUserRole}
                />
              }
            />
            <Route
              path="/login/clinician"
              element={
                <LoginClinician
                  setIsLoggedIn={setIsLoggedIn}
                  setUserRole={setUserRole}
                />
              }
            />
            <Route
              path="/login/patient"
              element={
                <LoginPatient
                  setIsLoggedIn={setIsLoggedIn}
                  setUserRole={setUserRole}
                />
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
