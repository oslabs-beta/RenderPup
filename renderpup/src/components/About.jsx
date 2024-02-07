import React from "react";
import { useNavigate } from 'react-router-dom';
import Charmie from '../../public/Charmie.jpeg';
import Tanner from '../../public/Tanner.jpeg';
import Ariel from '../../public/Ariel.jpeg';
import Vicky from '../../public/Vicky.jpeg';

const About = () => {
  const navigate = useNavigate();
  // handleSignout function = functionality to redirect user to logout component when clicking 'Sign Out' on navbar
  const handleDashboard = () => {
    // navigate to logout component 
    navigate('/dashboard');
  }
    return (
        <div>
          <button 
            onClick={handleDashboard} 
            style={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: '10px'
          }}
          >
            Back to Dashboard
          </button>

            <div id="meet" style={{ alignItems: 'center', textAlign: 'center' }}>
                Meet the engineers!
            </div>
            <br/>
            <br/>
            {/* CSS to center charmie's image */}
            <div id="engineerPics" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <img id='about' src={Charmie} alt="Charmie" /> <br/>
                    Charmie Dubongco <br/>
                    {/* links to charmie's github & linkedin */}
                    <div>
                      <a href="https://www.linkedin.com/in/charmie-d-17293011b/">
                          <img id ='aboutimage' src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
                      </a>
                    </div>
                    <div>
                    <a href="https://github.com/charmieduhh">
                          <img id ='aboutimage' src="https://img.shields.io/badge/Github%20-282a2e?style=for-the-badge&logo=github&logoColor=367cfe" alt="github" />
                      </a>
                    </div>
                </div>

                {/* CSS to center tanner's image */}
                <div style={{ textAlign: 'center' }}>
                    <img id='about' src={Tanner} alt="Tanner" /> <br/>
                    Tanner Robertson <br/>
                    <div>
                      {/* links to tanner's github & linkedin */}
                      <a href="https://www.linkedin.com/in/tanner-robertson-3343a42a2/">
                          <img id ='aboutimage' src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
                      </a>
                    </div>
                    <div>
                    <a href="https://github.com/XilloGen">
                          <img id ='aboutimage' src="https://img.shields.io/badge/Github%20-282a2e?style=for-the-badge&logo=github&logoColor=367cfe" alt="github" />
                      </a>
                </div>
                </div>
                {/* CSS to center ariel's image */}
                <div style={{ textAlign: 'center' }}>
                    <img id='about' src={Ariel} alt="Ariel" /> <br/>
                    Ariel Maor <br/>
                    <div>
                      {/* links to ariel's github & linkedin */}
                      <a href="https://www.linkedin.com/in/ariel-maor-aa419220/">
                          <img id ='aboutimage' src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
                      </a>
                    </div>
                    <div>
                    <a href="https://github.com/Amaor426"> 
                          <img id ='aboutimage' src="https://img.shields.io/badge/Github%20-282a2e?style=for-the-badge&logo=github&logoColor=367cfe" alt="github" />
                      </a>
                    </div>
                </div>


                <div style={{ textAlign: 'center' }}>
                    {/* CSS to center vicky's image */}
                    <img id='about' src={Vicky} alt="Vicky" /> <br/>
                    Vicky Hoang <br/>
                    <div>
                      {/* links to vicky's github & linkedin */}
                    <a href="https://www.linkedin.com/in/vkhoang/">
                          <img id ='aboutimage' src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
                      </a>
                    </div>
                    <div>
                    <a href="https://github.com/vkhoang">
                          <img id ='aboutimage' src="https://img.shields.io/badge/Github%20-282a2e?style=for-the-badge&logo=github&logoColor=367cfe" alt="github" />
                      </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
