import React from 'react';
import { Doughnut } from 'react-chartjs-2';

// donut chart template from chart.js 
const doughnutChart = (props) => {
  // chartData contains keys & values
    const chartData = props.data.data[props.data.data.length - 1].bs;
    //keys are the website URL's 
    const keys = Object.keys(chartData)
    //values are the bundle sizes
    const values = Object.values(chartData)
    console.log('VALUES', values)
    console.log(keys, values)
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
        labels: keys.map(item => item),
        datasets: [
          {
            // iterate through keys & values to show individual key on donut chart 
            // labels = x axis 
            labels: keys.map(item => item),
            // data = y axis 
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
              // chart title
              text: 'Bundle Size'
          },
            position: 'bottom'
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