import React from 'react';
import { Bar } from 'react-chartjs-2';

const Bargraph = (props) => {
    // const [chartConfig, setConfig] = useState({
    //     label: "",
    //     datasets: []
    // });
    console.log("PROPS DATA", props.data)
    const chartData = props.data.data
   const config = {
        labels: chartData.map(item => item.date),
        datasets: [
          {
            label: "Time to First Byte",
            data: chartData.map(item => item.ttfb),
            backgroundColor: 'rgba(7,123,247,1)',
            borderColor: 'rgba(7,123,247,1)',
            borderWidth: 1,
          },
          {
            label: "Time to Last Byte",
            data: chartData.map(item => item.ttlb),
            backgroundColor: 'rgb(242, 140, 40)',
            borderColor: 'rgb(242, 140, 40)',
            borderWidth: 1,
          }
        ],
      }
  return (
    <div className="graphSizes">
    <Bar 
      data={config}
    />
    </div>
  );
};

export default Bargraph;


