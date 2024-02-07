import React from "react";
import { useNavigate } from 'react-router-dom';
import Charmie from '../../public/Charmie.jpeg';
import Tanner from '../../public/Tanner.jpeg';
import Ariel from '../../public/Ariel.jpeg';
import Vicky from '../../public/Vicky.jpeg';
import renderpup from '../../public/renderpup.png';

const About = () => {
  const navigate = useNavigate();
  // handleSignout function = functionality to redirect user to dashboard component on about page
  const handleDashboard = () => {
    // navigate to dashboard component 
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
          <br/>
          {/* renderpup 'about info' with CSS */}
            {/* sorry i did most of the CSS on the same file :') */}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', textAlign: 'left' }}>
            <img src={renderpup} alt="renderpup" style={{ width: '28em', height: '28em', marginRight: '20px' }} />
            <div>
              <h1 style={{ color: '#219ebc' }}>RenderPup</h1>
              <p>
                RenderPup is a web application designed to analyze Next.js websites by running various performance tests and providing insightful metrics. With RenderPup, users can input a URL for a Next.js website, and the application will conduct tests to measure important performance metrics such as time to first byte, first and largest contentful paint, network server latency, and bundle size.
              </p>

              <h3 style={{ color: '#219ebc', textAlign: 'center' }}>Description</h3>

              <p>
                RenderPup addresses the critical need for developers and website owners to understand the performance characteristics of their Next.js websites. By providing comprehensive metrics, RenderPup enables users to identify potential bottlenecks and optimize their websites for better user experience and search engine rankings.
              </p>

              <h3 style={{ color: '#219ebc', textAlign: 'center' }}>Key Features</h3>

              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><strong>Performance Testing</strong>: RenderPup conducts various tests to assess the performance of Next.js websites.</li>
                <li><strong>Real-Time Metric Analysis</strong>: It provides detailed metrics including time to first byte, first and largest contentful paint, network server latency, and bundle size.</li>
                <li><strong>User-friendly Interface</strong>: RenderPup features a simple and intuitive interface, making it easy for users to input URLs and view performance metrics.</li>
                <li><strong>Dashboard</strong>: A user-friendly dashboard to visualize performance metrics and gain actionable insights.</li>
              </ul>
            </div>
          </div>

            <div id="meet" style={{ alignItems: 'center', textAlign: 'center' }}> <br/> <br/>
            <h1 style={{ color: '#219ebc' }}>Meet the engineers!</h1>
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
