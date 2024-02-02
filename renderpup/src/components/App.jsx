import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './dashboard';
import { Chart as ChartJS } from 'chart.js/auto';
import Bargraph from './BarGraph';
import Doughnut from './Doughnut';
import LineChartTTFB from './LineChartTTFB';
import LineChartNSL from './LineChartNSL';
import BubbleChart from './BubbleChart';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';




const App = () => {
  // use state to set initial state of form 
  const [currentForm, setCurrentForm] = useState('login');
  //have initial state to be the same format that's returned from the server
  const [chartData, setData] = useState({data:[{url:0}]});
  const [urls, setUrls] = useState(new Set());
  //use toggleForm to change current state (login) to SignIn
  const toggleForm = (formName) => {
    // to prevent entire page from being reloaded 
    // e.preventDefault();
    setCurrentForm(formName);
  };
  

  const [redirectUrl, setRedirectUrl] = useState(null);
  // // const history = useNavigate();
  // useEffect(() => {
    
  //   fetch('/dashboard')
  //     .then(async response => {
  //       await response.json();
  //       if(response) {
  //         setRedirectUrl(response);
  //       }
  //     })
  // },[])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/dashboard');
  //       const data = await response.json();
  //       console.log('data:', data);

  //       if (response.ok) {
  //         history(data.redirectUrl);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching dashboard:', error);
  //     }
  //   };

  //   fetchData();
  // }, [history]);

  // useEffect(() => {

  //   if (redirectUrl) {
  //     history(redirectUrl);
  //   }
  // }, [redirectUrl, history])



useEffect(() => {
  
  function fetchUrls() {
    fetch('/api')
    .then(response => response.json())
    .then(data => {
      let newUrl
      const uniqueUrls = new Set()
      for (const url of data.urls) {
        if (url.url[url.url.length - 1] === '/') {
          const tempArr = url.url.split('')
          tempArr.splice(url.url.length - 1, 1)
          newUrl = tempArr.join('')
        }
        uniqueUrls.add(newUrl)
      }
      setUrls(uniqueUrls)
    })
    .catch(err => console.log('ahhh an error: ', err))
  }
  
  fetchUrls()
}, []);

function convertDate(date) {
  if (date === undefined) return
  const dateArr = date.split('')
  for (let i = 0; i < dateArr.length; i++) {
    if (dateArr[i] == 'T') {
      dateArr[i] = ' '
    }
    else if (dateArr[i] == '.') {
      dateArr.splice(i, dateArr.length + 1)
    }
  }
  return dateArr.join('')
}

return (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<>{currentForm === "login" ? <SignIn onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm} />}</>} />
        <Route path="/dashboard" element={
          <div className="drop-down-menu">
            <Dashboard updateState={setData} currState={chartData} urlList={urls} />
            <br />
            <div id='graphs'>
              {<Bargraph data={chartData} convertDate={convertDate} />}
              {<LineChartTTFB data={chartData} convertDate={convertDate} />}
              {<LineChartNSL data={chartData} convertDate={convertDate} />}
            </div>
          </div>
        } />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  </Router>
);

}

export default App;