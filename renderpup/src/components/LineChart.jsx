import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
    const chartData = props.data.data;
    const config = {
        labels: chartData.map(item => item.date),
        datasets: [
            {
                label: 'Time To First Byte (TTFB)',
                fill: false,
                lineTension: 0.2,
                backgroubdColor: 'rgba(75,192,192,0,4)',
                borderColor: 'rgba(75,192,192,1)',
                data: chartData.map(item => item.ttfb)
            }
        ]
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
                    text: 'Time(m/s)'
                }
            }
        }
    }
    return (
        <div className="graphSizes">
        <Line 
          data={config} options={options}
        />
        </div>
    )
}

export default LineChart;
