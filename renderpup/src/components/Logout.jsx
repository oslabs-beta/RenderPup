import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.success) {
          console.log(responseData.message);
          navigate('/signin');
        } else {
          console.error('Logout failed:', responseData.message);
        }
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      Logged out!
    </div>
  );
};

export default Logout;
