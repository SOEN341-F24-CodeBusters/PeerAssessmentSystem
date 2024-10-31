import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'instructor'>('student');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    // Handling sign-in for both student or instructor
    const apiUrl = 'https://localhost:7010/api/Authentification/LogIn';
    
    const loginData = {
      userType: userType === 'student' ? 0 : 1,
      email,
      password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(loginData),
        credentials: 'include', // Include credentials to store cookies
      });

      if (response.ok) {
        const responseData = await response.json(); 
        console.log('Login successful:', responseData);
        
        //navigate to corresponding user type's home page after successful logged in
        navigate(userType === 'student' ? '/Students/PeerAssessment' : '/Teacher/TeamOverview');
        
      }else{
        const errorData = await response.json();
        console.error('Login error:', errorData);
        alert(errorData.message || 'Login failed. Please check your credentials and try again.'); // Display error message
      }

    } catch (error){
      console.error('Request failed:', error);
      alert('An error occurred. Please check your connection and try again.');
    };


    console.log(`Signing in as ${userType} with email: ${email} and password: ${password}`);

  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="sign-in-btn">Sign In</button>
        </form>

        <div className="no-account">
          <p>Don't have an account?</p>
          <button onClick={() => navigate('/signup')} className="sign-up-link">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
