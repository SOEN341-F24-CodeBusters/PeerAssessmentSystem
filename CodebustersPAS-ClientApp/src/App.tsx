import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";

import PeerAssessment from "./pages/Students/PeerAssessment";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} /> {}
          <Route path="/signup" element={<CreateAccount />} /> {}
          <Route path="/courselisting-students" element={<PeerAssessment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
