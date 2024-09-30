import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccountPage.css'; 

const CreateAccount: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'instructor'>('student');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [studentID, setStudentID] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    const apiUrl = 'https://localhost:7010';
    
    const userData={
      userType,
      firstName,
      lastName,
      studentID: userType === 'student' ? studentID : null,
      email,
      password,
    };
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        console.log('User created successfully'+'User signed up<\n>'+userData);

        navigate('/'); 
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Request failed:', error);
      alert('An error occurred. Please check your connection and try again.');
    }

    
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
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
              required
              placeholder="Enter your last name"
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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
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
