import React from 'react';
import { useNavigate } from 'react-router-dom';


const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
  
    const handleLogout = async () => {
        const apiUrl = 'https://localhost:7010/api/Authentification/LogOut';
    
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
      
          if (response.ok) {
            const contentType = response.headers.get('Content-Type');
            let responseData;
            if (contentType && contentType.includes('application/json')) {
            responseData = await response.json(); 
            console.log('Logout successful:', responseData)
          } else {
            console.log('Logout successful with no response data.');
          }
            navigate('/');
          } else {
            console.error('Logout failed with status:', response.status);
          }
        } catch (error) {
          console.error('An error occurred during logout:', error);
        }
      };

      return (
        <a
          href="#"  
          onClick={handleLogout}
          className="logout-link"
          onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          Logout
        </a>
      );
    };
    
    export default LogoutButton;