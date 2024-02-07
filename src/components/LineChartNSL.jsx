import React from 'react';
import { Line } from 'react-chartjs-2';

//functional component to render a line chart for Network Server Latency
const LineChartNSL = ({data, convertDate}) => {
    //extract the data from the passed 'data' prop
    const chartData = data.data;
    //configuration object for the chart
    const config = {
        //setting the labels for the x-axis by mapping over the data and converting dates
        labels: chartData.map(item => convertDate(item.date)),
        datasets: [
            {
                label: 'Network Server Latency (NSL)',
                fill: false,
                lineTension: 0.7,
                backgroundColor: '#ffb703',
                borderColor: '#0077b6',
                data: chartData.map(item => item.nsl),
                pointRadius: 5
            }
        ]
    }
    //setting the options for the chart, including the scales and titles
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
    //rendering the Line chart with the configured data and options
    return (
        <div className="graphSizes">
        <Line 
          data={config} options={options}
        />
        </div>
    )
}

export default LineChartNSL;
