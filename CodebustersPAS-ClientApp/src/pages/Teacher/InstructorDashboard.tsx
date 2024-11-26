import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SignIn from "../LoginPage";
import CreateAccount from "../CreateAccountPage";
import GroupEvaluation from "../CourseEvaluation/GroupEvaluation";
import SelfAssessment from "../CourseEvaluation/Self-Assessment";
import PeerAssessment from "../Students/PeerAssessment";
import TeamOverview from "../Teacher/CreateTeam/TeamOverview";
import Navbar from "../NavBar";
import SummaryComments from "../CourseEvaluation/Summary_Comments";
import InstructorDashboard from "../Teacher/InstructorDashboard";
import TeamEvaluation from "../Teacher/TeamEvaluation"; // Import the TeamEvaluation component

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (process.env.NODE_ENV === 'deploy') {  
      const redirectPath = sessionStorage.getItem("redirectPath");
      if (redirectPath) {
        sessionStorage.removeItem("redirectPath");
        console.log("Redirecting to: ", redirectPath);
        navigate(redirectPath);
      }
    }
  }, [navigate]);

  const location = useLocation();

  const showLogout = !["/", "/signup"].includes(location.pathname);

  return (
    <div className="App">
      <Navbar showLogout={showLogout} />
      <div className="content"></div>
      <Routes>
        <Route path="" element={<SignIn />} /> {}
        <Route path="signup" element={<CreateAccount />} /> {}
        <Route path="group-evaluation" element={<GroupEvaluation />} />
        
        <Route path="Student/SelfAssessment" element={<SelfAssessment />} />
        <Route path="Student/PeerAssessment" element={<PeerAssessment />} />
        <Route path="Student/SummaryComments" element={<SummaryComments />} />
        
        <Route path="Teacher/TeamOverview" element={<TeamOverview />} />
        <Route path="Teacher/Dashboard/:groupName" element={<InstructorDashboard />} />
        <Route path="Teacher/TeamEvaluation" element={<TeamEvaluation />} /> {/* Add this route */}
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
