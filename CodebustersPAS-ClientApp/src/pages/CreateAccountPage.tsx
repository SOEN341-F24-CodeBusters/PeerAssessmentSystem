import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccountPage.css'; 

const CreateAccount: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'instructor'>('student');
  const [firstName, setFirstName] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [studentID, setStudentID] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    
    console.log({
      userType,
      firstName,
      fullName,
      studentID,
      username,
      password,
    });
    
    navigate('/');
  };

  return (
    <div className="create-account-container">
      <div className="create-account-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="user-type">
            <label className="radio-label">
              <input
                type="radio"
                value="student"
                checked={userType === 'student'}
                onChange={() => setUserType('student')}
              />
              <span>Student</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="instructor"
                checked={userType === 'instructor'}
                onChange={() => setUserType('instructor')}
              />
              <span>Instructor</span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>

          {userType === 'student' && (
            <div className="form-group">
              <label htmlFor="studentID">Student ID</label>
              <input
                id="studentID"
                type="text"
                value={studentID}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setStudentID(e.target.value)}
                placeholder="Enter your student ID"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
              placeholder="Choose a username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              placeholder="Choose a password"
            />
          </div>

          <button type="submit" className="sign-up-btn">Sign Up</button>
        </form>
        <div className="already-account">
          <span>Already have an account? </span>
          <button onClick={() => navigate('/')} className="sign-in-link">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
