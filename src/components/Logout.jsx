import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import wavingdoggo from '../../public/wavingdoggo.gif';


const Logout = () => {
  //declare this hook at the top level component!!
  const navigate = useNavigate();
  // use useState hook to render a message before being redirected to login page 
  const [ message, setMessage ] = useState('');
  // invoke wavingDoggo outside useEffect so return statement can refer to it
  const wavingDoggo = <img id='logoutDog' src={wavingdoggo}></img>;

  useEffect(() => {
  const handleLogout = async () => {
    
    try {
      //post req from server with path /logout
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.success) {
          console.log(responseData)
          setMessage('Logging out... goodbye!');
          
          setTimeout(() => {
            //clear the message after timer ends
            setMessage('')
            
          
          navigate('/signin');
        }, 3000) //4 sec delay before redirecting to signin
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

    handleLogout();
  }, [navigate]);

  return (
    <div id= "logoutPage">
      { wavingDoggo }
     { message }
    </div>
  );
};

export default Logout;
