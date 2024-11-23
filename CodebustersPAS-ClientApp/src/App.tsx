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

  const isDeployment = process.env.NODE_ENV === 'deploy';
  const base = isDeployment ? '/PeerAssessmentSystem/' : '/';

  const showLogout = !["/", "/signup"].includes(location.pathname);

  return (
    <div className="App">
      <Navbar showLogout={showLogout} />
      <div className="content"></div>
      <Routes>
  
        <Route path={`${base}`} element={<SignIn />} /> {}
        <Route path={`${base}signup`} element={<CreateAccount />} /> {}
        <Route path={`${base}group-evaluation`} element={<GroupEvaluation />} />
        <Route path={`${base}Student/SelfAssessment`} element={<SelfAssessment />} />
        <Route path={`${base}Student/PeerAssessment`} element={<PeerAssessment />} />
        <Route path={`${base}Teacher/TeamOverview`} element={<TeamOverview />} /> {}
        <Route path={`${base}Student/SummaryComments`} element={<SummaryComments />} />
        <Route path={`${base}Teacher/Dashboard/:groupName'} element={<InstructorDashboard />} />

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
