import React,{useState} from 'react'
import Chart from "react-apexcharts";
import VisitorsArray from '../../../../DummyDatabase/LiveVisitors'
function PageViews() {
   
    const [chartoptions, setchartOptions] = useState({
        colors:['#007AFF'],
        zoom: {
            enabled: false
          },
        tooltip: {
            enabled:false,
            shared: false,
            intersect: false
          },
        chart: {
            height: 200,
            type: 'area'
          },
          stroke: {
            show: true,
            curve: 'smooth'
          },
        xaxis: {
            show: false,
            labels:{
                show:true
            }
            // categories:['Mon','Tue','Wed','Thur','Fri','Sat','Sun']
        },
        yaxis:{
            show: true,
           
           labels:{
            formatter: (val) => { 
                return val +' k'
             },
           },
           axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            width: 10,
            offsetX: 0,
            offsetY: 0
        },
      
        }
      },
      )
      const [chartSeries, setchartSeries] = useState([
        {
          name: "Live Visitors",
          data:VisitorsArray
        },
        
      ]
      )
  return (
    <Chart
          options={chartoptions}
          series={chartSeries}
          type="area"
          width="100%"
          height={400}
         
        />
  )
}
export default PageViews