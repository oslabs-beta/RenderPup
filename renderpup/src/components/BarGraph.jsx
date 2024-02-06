import React from 'react';
import { Bar } from 'react-chartjs-2';

//functional component to render a bar graph
const Bargraph = (props) => {
  //extracting the data from the passed 'props.data' object
    const chartData = props.data.data
    //configuration object for the bar graph
    const config = {
      //setting the labels for the x-axis by mapping over tha data and coverted date
        labels: chartData.map(item => props.convertDate(item.date)),
        datasets: [
          {
            //configuring the first dataset for FCP
            label: "First Contentful Paint (FCP)",
            data: chartData.map(item => item.fcp),
            backgroundColor: '#ffb703', 
            borderColor: '#ffb703',
            borderWidth: 1,
            borderRadius: 5,
            hoverBackgroundColor: '#fb8500',
            hoverBorderColor: '#0077b6',
            hoverBorderWidth: 3,
          },
          {
            //configuring the second dataset for LCP
            label: "Largest Contentful Paint (LCP)",
            data: chartData.map(item => item.lcp),
            backgroundColor: '#0077b6', 
            borderColor: 'rgba(255,255,255,0.5)',
            borderWidth: 1,
            borderRadius: 5,
            hoverBackgroundColor: '#03045e',
            hoverBorderColor: '#fb8500',
            hoverBorderWidth: 3,
          },
        ],
      }
      //setting the options for the bar graph
      const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    font: {
                      size: 14
                  }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Time (m/s)',
                    font: {
                      size: 14
                  }
                }
            }
        }
    }
    //rendering the bar graph with the configured data and options
  return (
    <div className="graphSizes">
    <Bar 
      data={config} options={options}
    />
    </div>
  );
};

export default Bargraph;


