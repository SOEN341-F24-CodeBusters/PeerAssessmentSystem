import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";

import PeerAssessment from "./pages/Students/PeerAssessment";
import GroupEvaluation from "./pages/CourseEvaluation/GroupEvaluation";

import CreateTeam from "./pages/Teacher/CreateTeam/CreateTeam.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} /> {}
          <Route path="/signup" element={<CreateAccount />} /> {}
          <Route path="/courselisting-students" element={<PeerAssessment />} />
          <Route path="/group-evaluation" element={<GroupEvaluation />} />
          <Route path="/Teacher/TeamOverview" element={<CreateTeam />} /> {}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
