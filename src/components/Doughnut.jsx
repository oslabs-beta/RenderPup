import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const doughnutChart = (props) => {
  const chartData = props.data.data[props.data.data.length - 1].bs;
  const keys = Object.keys(chartData);
  const values = Object.values(chartData);
  const backgroundColors = [
    'rgba(7,123,247,1)',
    'rgba(255,99,132,1)',
    'rgba(54,162,235,1)',
    'rgb(242, 140, 40)',
    '#bde0fe',
    '#219ebc',
    '#023047',
    '#ffb703',
    '#fb8500',
    // Add more colors as needed
  ];
  const config = {
    labels: keys.map((item) => item),
    datasets: [
      {
        labels: keys.map((item) => item),
        data: values.map((item) => item),
        backgroundColor: backgroundColors,
        borderWidth: 1,
        borderAlign: 'center',
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        title: {
          display: true,
          text: 'Bundle Size', // Your chart title
          // position: 'bottom'
        },
        position: 'bottom',
      },
    },
  };
  return (
    <div className='graphSizes'>
      <Doughnut data={config} options={options} />
    </div>
  );
};

export default doughnutChart;
