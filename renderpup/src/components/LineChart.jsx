import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
    const chartData = props.data.data
   const config = {
        labels: chartData.map(item => item.date),
        datasets: [
          {
            label: "Time To First Byte (TTFB)",
            data: chartData.map(item => item.ttfb),
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgb(242, 140, 40)',
            borderColor: 'rgb(242, 140, 40)'
            
          },
        ],
      }
      const options = {
        scales: {
          x: {
            title: {
              display: true,
              text: 'X Axis Title'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Y Axis Title'
            }
          }
        }
      }
      
  return (
    <Line 
      data={config} options={options}
    />
  );
};

export default LineChart;