import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChartTTFB = (props) => {
    const chartData = props.data.data;
    const config = {
        labels: chartData.map(item => props.convertDate(item.date)),
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
        <Line 
          data={config} options={options}
        />
        </div>
    )
}

export default LineChartTTFB;
