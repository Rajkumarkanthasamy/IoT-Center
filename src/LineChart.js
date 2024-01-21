/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const  LineChart=()=>{

    const options = {
        theme: "dark2",
        innerHeight:"400px",
        title: {
            text: "Temperature and Humidity"
        },
        subtitles: [{
            //text: "GBP & USD to INR"
        }],
        axisY: {
            prefix: "c"
        },
        toolTip: {
            shared: true
        },
        data: [
        {
            type: "area",
            name: "temp",
            showInLegend: true,
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,##0.##",
            color:"#ccffff",
            dataPoints: [
                { x: new Date("2017- 01- 01"), y: 84.927},
                { x: new Date("2017- 02- 01"), y: 82.609},
                { x: new Date("2017- 03- 01"), y: 81.428},
                { x: new Date("2017- 04- 01"), y: 83.259},
                { x: new Date("2017- 05- 01"), y: 83.153},
                { x: new Date("2017- 06- 01"), y: 84.180},
                { x: new Date("2017- 07- 01"), y: 84.840},
                { x: new Date("2017- 08- 01"), y: 82.671},
                { x: new Date("2017- 09- 01"), y: 87.496},
                { x: new Date("2017- 10- 01"), y: 86.007},
                { x: new Date("2017- 11- 01"), y: 87.233},
                { x: new Date("2017- 12- 01"), y: 86.276}
            ]
        },
        {
            type: "area",
            name: "hum",
            showInLegend: true,
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "₹#,##0.##",
            color:"#cce6ff",
            dataPoints: [
                { x: new Date("2017- 01- 01"), y: 67.515},
                { x: new Date("2017- 02- 01"), y: 86.725},
                { x: new Date("2017- 03- 01"), y: 64.86},
                { x: new Date("2017- 04- 01"), y: 44.29},
                { x: new Date("2017- 05- 01"), y: 94.51},
                { x: new Date("2017- 06- 01"), y: 34.62},
                { x: new Date("2017- 07- 01"), y: 64.2},
                { x: new Date("2017- 08- 01"), y: 93.935},
                { x: new Date("2017- 09- 01"), y: 65.31},
                { x: new Date("2017- 10- 01"), y: 94.75},
                { x: new Date("2017- 11- 01"), y: 94.49},
                { x: new Date("2017- 12- 01"), y: 63.84}
            ]
        }
        ]
    }
	
		
		return (
			<div>
				<CanvasJSChart options = {options}
						/* onRef={ref => this.chart = ref} */
				/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}


 export default LineChart;   
