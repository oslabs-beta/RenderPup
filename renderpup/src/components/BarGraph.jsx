import React from 'react';
import { Bar } from 'react-chartjs-2';

function convertDate(date) {
  if (date === undefined) return
  const dateArr = date.split('')
  for (let i = 0; i < dateArr.length; i++) {
    if (dateArr[i] == 'T') {
      dateArr[i] = ' '
    }
    else if (dateArr[i] == '.') {
      dateArr.splice(i, dateArr.length + 1)
    }
  }
  return dateArr.join('')
}

const Bargraph = (props) => {
  const chartData = props.data.data
  const config = {
    labels: chartData.map(item => convertDate(item.date)),
    datasets: [
      {
        label: "Time to First Byte",
        data: chartData.map(item => item.ttfb),
        backgroundColor: 'rgba(7,123,247,1)',
        borderColor: 'rgba(7,123,247,1)',
        borderWidth: 1,
      },
      {
        label: "First Contentful Paint",
        data: chartData.map(item => item.fcp),
        backgroundColor: 'rgb(242, 140, 40)',
        borderColor: 'rgb(242, 140, 40)',
        borderWidth: 1,
      },
      {
        label: "Last Contentful Paint",
        data: chartData.map(item => item.lcp),
        backgroundColor: 'rgba(7,123,247,1)',
        borderColor: 'rgba(7,123,247,1)',
        borderWidth: 1,
      },
      {
        label: "Network Server Latency",
        data: chartData.map(item => item.nsl),
        backgroundColor: 'rgba(7,123,247,1)',
        borderColor: 'rgba(7,123,247,1)',
        borderWidth: 1,
      },
    ],
  }
  return (
    <Bar 
      data={config}
    />
  );
};

export default Bargraph;
