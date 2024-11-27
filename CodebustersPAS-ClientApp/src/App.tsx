import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
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
import SummaryResults from "./pages/Teacher/Results/SummaryResults.jsx";
import DetailedResults from "./pages/Teacher/Results/DetailedResutls.jsx";
import TeamEvaluation from "./pages/Teacher/TeamEvaluation"; // Import the TeamEvaluation component

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (process.env.NODE_ENV === "deploy") {
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
        <Route path="" element={<SignIn />} />
        <Route path="signup" element={<CreateAccount />} />
        <Route path="group-evaluation" element={<GroupEvaluation />} />

        <Route path="Student/SelfAssessment" element={<SelfAssessment />} />
        <Route path="Student/PeerAssessment" element={<PeerAssessment />} />
        <Route path="Student/SummaryComments" element={<SummaryComments />} />

        <Route path="Teacher/TeamOverview" element={<TeamOverview />} />
        <Route path="Teacher/Dashboard/:groupName" element={<InstructorDashboard />} />
        <Route path="Teacher/Dashboard/Charts" element={<TeamEvaluation />} /> {/* Updated Route */}
        <Route path="Teacher/Results/Summary/:groupId" element={<SummaryResults />} />
        <Route path="Teacher/Results/Detailed/:groupId" element={<DetailedResults />} />
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
