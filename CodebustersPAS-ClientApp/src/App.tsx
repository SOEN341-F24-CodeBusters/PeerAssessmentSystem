import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SignIn from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccountPage";
import GroupEvaluation from "./pages/CourseEvaluation/GroupEvaluation";
import SelfAssessment from "./pages/CourseEvaluation/Self-Assessment";
import PeerAssessment from "./pages/Students/PeerAssessment";
import TeamOverview from "./pages/Teacher/CreateTeam/TeamOverview.jsx";
import Navbar from "./pages/NavBar";
import SummaryComments from "./pages/CourseEvaluation/Summary_Comments.tsx";
import InstructorDashboard from "./pages/Teacher/InstructorDashboard";

const App: React.FC = () => {
  const location = useLocation();

  const showLogout = !["/", "/signup"].includes(location.pathname);

  return (
    <div className="App">
      <Navbar showLogout={showLogout} />
      <div className="content"></div>
      <Routes>
        <Route path="/" element={<SignIn />} /> {}
        <Route path="/signup" element={<CreateAccount />} /> {}
        <Route path="/group-evaluation" element={<GroupEvaluation />} />
        <Route path="/Student/SelfAssessment" element={<SelfAssessment />} />
        <Route path="/Student/PeerAssessment" element={<PeerAssessment />} />
        <Route path="/Teacher/TeamOverview" element={<TeamOverview />} /> {}
        <Route path="/Student/SummaryComments" element={<SummaryComments />} />
        <Route path="/Teacher/Dashboard/:groupName" element={<InstructorDashboard />} />
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
