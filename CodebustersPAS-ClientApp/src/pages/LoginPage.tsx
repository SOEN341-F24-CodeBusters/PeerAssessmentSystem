import React, { useState, ChangeEvent, FormEvent } from 'react';
import './LoginPage.css';

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'instructor'>('student');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    // Handling sign-in for both student or instructor
    console.log(`Signing in as ${userType} with username: ${username} and password: ${password}`);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
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
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
              placeholder="Enter your username"
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

        <div className="sign-up-link">
          <p>Don't have an account?</p>
          <a href="/signup">Create one</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
