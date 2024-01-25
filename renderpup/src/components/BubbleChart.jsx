import React from 'react';
import { Bubble } from 'react-chartjs-2';


const BubbleChart = (props) => {
    const chartData = props.data.data
    console.log("BUBBLE CHART DATA", chartData)
   const config = {
        type: 'bubble',
        labels: chartData.map(item => item.date),
        datasets: [
          {
            label: "Network Server Latency",
            data: chartData.map(item => ({
                x: item.date,
                y: item.nsl,
                r: 10
            })),
            backgroundColor: 'rgba(7,123,247,1)',
            borderColor: 'rgba(7,123,247,1)',
            borderWidth: 1,
          },
        ],
      }
      console.log('BUBBLE CONFIG', config)
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
    <div className="graphSizes">
    <Bubble
      data={config} options={options}
    />
    </div>
  );
};

export default BubbleChart;

