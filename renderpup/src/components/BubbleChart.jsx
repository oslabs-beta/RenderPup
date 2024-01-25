import React from 'react';
import { Bubble } from 'react-chartjs-2';

const BubbleChart = (props) => {
    const chartData = props.data.data
   const config = {
        labels: chartData.map(item => item.date),
        datasets: [
          {
            label: "Network Server Latency (NSL)",
            data: chartData.map(item => ({
                x: item.date,
                y: item.nsl,
            })),
            backgroundColor: 'rgba(7,123,247,1)',
            borderColor: 'rgba(7,123,247,1)',
          },
        ],
      }
      const options = {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Time (m/s)'
            }
          }
        }
      }
      
  return (
    <Bubble 
      data={config} options={options}
    />
  );
};

export default BubbleChart;