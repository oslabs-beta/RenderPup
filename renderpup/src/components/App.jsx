import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from './dashboard';
import { Chart as ChartJS } from 'chart.js/auto';
import Bargraph from './BarGraph';
import Doughnut from './Doughnut';
import LineChartTTFB from './LineChartTTFB';
import LineChartNSL from './LineChartNSL';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';
import DashboardTwo from './DashboardTwo';




const App = () => {
  // use state to set initial state of form 
  const [currentForm, setCurrentForm] = useState('login');
  //have initial state to be the same format that's returned from the server
  const [chartData, setData] = useState({data:[{url:0, bs: {DummyData: 1}}]});
  //use toggleForm to change current state (login) to SignIn
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

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
  // create data-testid div to test for app component on testing file
  <div data-testid='app-component'>
    {/*  implement react router to  */}
 
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<>{currentForm === "login" ? ( <SignIn onFormSwitch={toggleForm} /> ) : ( <SignUp onFormSwitch={toggleForm} />)}</> } />
        <Route path="/dashboard" element={
          <div className="drop-down-menu">
            <DashboardTwo updateState={setData} currState={chartData} />
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
      </Routes>
      </Router>
    </div>
  
  </div>
);

}

export default App;