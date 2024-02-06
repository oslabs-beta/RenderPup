import React from 'react';
import { Line } from 'react-chartjs-2';

//functional component to render a line chart for Time To First Byte
const LineChartTTFB = ({data, convertDate}) => {
    //extracting the data from the passed 'data' prop
    const chartData = data.data;
    //configuration object for the line chart
    const config = {
        //setting the labels for the x-axis by mapping over the date and converting date
        labels: chartData.map(item => convertDate(item.date)),
        datasets: [
            {
                label: 'Time To First Byte (TTFB)',
                fill: false,
                lineTension: 0.7,
                backgroundColor: '#0077b6',
                borderColor: '#ffb703',
                data: chartData.map(item => item.ttfb),
                pointRadius: 5
            }
        ]
    }
    //setting the options for the line chart, including the scales and titles
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
    //rendering the line chart with the configured data and options
    return (
        <div className="graphSizes">
        <Line 
          data={config} options={options}
        />
        </div>
    )
}

export default LineChartTTFB;
