import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const doughnutChart = (props) => {
    console.log("PROPS DATA", props.data)
    const chartData = props.data.data;
    const backgroundColors = [
      'rgba(7,123,247,1)',
      'rgba(255,99,132,1)',
      'rgba(54,162,235,1)',
      'rgb(242, 140, 40)',
      // Add more colors as needed
  ];
   const config = {
        labels: chartData.map(item => item.memory_usage),
        datasets: [
          {
            label: "Memory Usage",
            data: chartData.map(item => item.memory_usage),
            backgroundColor: backgroundColors,
            borderWidth: 1,
            borderAlign: 'center'
          }
        ],
      }
    const options = {
        title: {
            display: true,
            text: 'Memory Usage Overview', // Your chart title
            fontSize: 16,
        },
    };
  return (
    <div className="graphSizes">
    <Doughnut
      data={config}
      options = {options}
    />
    </div>
  );
};

export default doughnutChart;