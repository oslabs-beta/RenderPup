import React, { useState, useEffect} from "react";
import Dashboard from './dashboard';
import { Chart as ChartJS } from 'chart.js/auto';
import Bargraph from './BarGraph';
import Doughnut from './Doughnut';
import LineChartTTFB from './LineChartTTFB';
import LineChartNSL from './LineChartNSL';
import BubbleChart from './BubbleChart';


const App = () => {
  //have initial state to be the same format that's returned from the server
  const [chartData, setData] = useState({data:[{url:0}]});
  const [urls, setUrls] = useState(new Set())
  
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
  return (
      <div className ="drop-down-menu">
      <Dashboard updateState={setData} currState={chartData} urlList={urls} />
      <br></br>
      {/* Render graphs when data is available */}
        <div id='graphs'>
          {<Bargraph data={chartData} convertDate={convertDate} />}    
          {<LineChartTTFB data={chartData} convertDate={convertDate} />}  
          {<LineChartNSL data={chartData} convertDate={convertDate} />} 
        </div>
      </div>
  )
}

export default App;