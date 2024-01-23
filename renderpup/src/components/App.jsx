import React, { useState, useEffect} from "react";
import Dashboard from './dashboard';
//need this to 
import { Chart as ChartJS } from 'chart.js/auto';
import Bargraph from './Bargraph';



const App = () => {
  //have initial state to be the same format that's returned from the server
  const [chartData, setData] = useState({data:[{
    data:0
  }]});
  useEffect(() => {
  
  //gets previous data from db
  function fetchData() {
    // make a http request to /api
    console.log('here')
    fetch('/api')
      .then(response => {
        //then checks of status code is ok (200-299); if not, throw 404 error
        if (!response.ok) {
          console.error(`Network response is not rendering, ${response.status} error`)
        }
        return response.json();
      })
      //use useState to access TTFB 
      .then(data => {
        // console.log("SEE YOUR DATA", data);
        
        setData(data);
      })
      .catch(error => {
        // console.log('UNEXPECTED ERROR: ', error)
      });
  }
    // invoke fetchData function 
    fetchData();
}, []);
  return (
      <div>
      <Dashboard/>
      {/* Render Bargraph when data is available */}
      {<Bargraph data={chartData} />}    
        
      </div>
  )
}

export default App;