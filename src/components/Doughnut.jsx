import React from 'react';
import { Doughnut } from 'react-chartjs-2';

// donut chart template from chart.js 
const doughnutChart = (props) => {
  //pulls bundle size out of props
  const chartData = props.data.data[props.data.data.length - 1].bs;
  //grabs keys and values from bundle size data and stores them as arrays
  const keys = Object.keys(chartData)
  const values = Object.values(chartData)
  const backgroundColors = [
    'rgba(7,123,247,1)',
    'rgba(255,99,132,1)',
    'rgba(54,162,235,1)',
    'rgb(242, 140, 40)',
    '#bde0fe',
    '#219ebc',
    '#023047',
    '#ffb703',
    '#fb8500'
    // Add more colors as needed
];
  const config = {
    //sets labels from the keys array
    labels: keys.map(item => item),
    datasets: [
      {
        //sets labels from the keys array
        labels: keys.map(item => item),
        //sets dataset from values array
        data: values.map(item => item),
        backgroundColor: backgroundColors,
        borderWidth: 1,
        borderAlign: 'center'
      }
    ],
  }
  const options = {
      plugins: {
        legend: {
          title: {
            display: true,
            text: 'Bundle Size (bytes)', // Your chart title
        },
          position: 'bottom' //changes lengend to below the chart
        }
      }
    };
  return (
    // chart.js functionality to render bundle sizes on donut chart 
    <div className='graphSizes'>
    <Doughnut
      data={config}
      options = {options}
    />
    </div>
  );
};

export default doughnutChart;