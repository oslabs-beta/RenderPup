import React from 'react';
import { Bar } from 'react-chartjs-2';

const Bargraph = (props) => {
    const chartData = props.data.data
   const config = {
        labels: chartData.map(item => props.convertDate(item.date)),
        datasets: [
          {
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
  return (
    <div className="graphSizes">
    <Bar 
      data={config} options={options}
    />
    </div>
  );
};

export default Bargraph;


