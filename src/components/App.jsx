import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Chart as ChartJS } from 'chart.js/auto';
import Bargraph from './BarGraph';
import Doughnut from './Doughnut';
import LineChartTTFB from './LineChartTTFB';
import LineChartNSL from './LineChartNSL';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Logout from './Logout';
import Dashboard from './dashboard';
import About from './About';


const App = () => {
  // use state to set initial state of form 
  const [currentForm, setCurrentForm] = useState('login');
  //have initial state to be the same format that's returned from the server
  const [chartData, setData] = useState({data:[{url:0, bs: {DummyData: 1}}]});
  //use toggleForm to change current state (login) to SignIn
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  
// functionality to make the date look better on graphs/charts 
function convertDate(date) {
  if (date === undefined) return
  const dateArr = date.split('')
  for (let i = 0; i < dateArr.length; i++) {
    // T = letter in the middle of long date string, replace T with a space
    if (dateArr[i] == 'T') {
      dateArr[i] = ' '
    }
    // delete date string from '.' to rest of date string 
    else if (dateArr[i] == '.') {
      dateArr.splice(i, dateArr.length + 1)
    }
  }
  return dateArr.join('')
}

return (
  // create data-testid div to test for app component on testing file
  <div data-testid='app-component'>
    {/*  implement react router to  to allow client-side routing of react compoennts*/}
      {/*  used to set paths to different components to use useNavigate hook (lines 49, 50, 62, 63*/}
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<>{currentForm === "login" ? ( <SignIn onFormSwitch={toggleForm} /> ) : ( <SignUp onFormSwitch={toggleForm} />)}</> } />
        <Route path="/dashboard" element={
          <div className="drop-down-menu">
            <Dashboard updateState={setData} currState={chartData} />
            <br />
            <div id='graphs'>
              {<Bargraph data={chartData} convertDate={convertDate} />}
              {<LineChartTTFB data={chartData} convertDate={convertDate} />}
              {<LineChartNSL data={chartData} convertDate={convertDate} />}
              {<Doughnut data={chartData} convertDate={convertDate} />}
            </div>
          </div>
        } />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </Router>
    </div>
  
  </div>
);

}

export default App;