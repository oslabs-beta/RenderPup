import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChartNSL = ({data, convertDate}) => {
    const chartData = data.data;
    const config = {
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

export default LineChartNSL;
