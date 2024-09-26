import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SignIn from './pages/LoginPage';
import CreateAccount from './pages/CreateAccountPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} /> {}
          <Route path="/signup" element={<CreateAccount />} /> {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

