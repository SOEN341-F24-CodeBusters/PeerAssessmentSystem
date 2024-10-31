import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";
import PeerAssessment from "./pages/Students/PeerAssessment";

import TeamOverview from "./pages/Teacher/CreateTeam/TeamOverview.jsx";
import Navbar from './pages/NavBar';


const App: React.FC = () => {
  const location = useLocation();

  const showLogout = !['/', '/signup'].includes(location.pathname);

  return (
      <div className="App">
      <Navbar showLogout={showLogout}/>
      <div className="content"></div>
        <Routes>
          <Route path="/" element={<SignIn />} /> {}
          <Route path="/signup" element={<CreateAccount />} /> {}
          <Route path="/Students/PeerAssessment" element={<PeerAssessment />} />

          <Route path="/Teacher/TeamOverview" element={<TeamOverview />} /> {}

        </Routes>
      </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppContent;
