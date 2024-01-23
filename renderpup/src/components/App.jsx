import React, { useState, useEffect} from "react";
import Dashboard from './dashboard'


const App = () => {
  const [data, setData] = useState("");
  useEffect(() => {
  
  
  function fetchData() {
    // make a http request to /api
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
      </div>
  )
}

export default App;