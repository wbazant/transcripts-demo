import React from 'react'
import PropTypes from 'prop-types'

import URI from 'urijs'

import ReactHighcharts from 'react-highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
HighchartsMore(ReactHighcharts.Highcharts)
import uncontrollable from 'uncontrollable'
import ReactSelect from 'react-select'
import 'react-select/dist/react-select.css';


const SUFFIX=" individual"
const baseConfig = ({xAxisCategories,useLogarithmicAxis}) => ({
	chart: {
		type: 'boxplot',
		zoomType: 'x',
		events: {
	      load: function() {

			//works apart from when you later take some series out with the menu
			//http://jsfiddle.net/sza4odkz/1/
			this.series.forEach((series,ix,self) => {
				if(series.type=='scatter'){
					const correspondingBoxplotSeries = self.find((otherSeries, otherIx) =>( otherSeries.name == series.name.replace(SUFFIX,"") && otherIx !==ix))

					if (correspondingBoxplotSeries){
						series.data.forEach((point) => {
							point.x = correspondingBoxplotSeries.xAxis.toValue(correspondingBoxplotSeries.data[point.x].shapeArgs.x + (correspondingBoxplotSeries.data[point.x].shapeArgs.width /2 ) + correspondingBoxplotSeries.group.translateX + (correspondingBoxplotSeries.data[point.x].stem.strokeWidth() % 2 )/2)
						})
					}
				}
			})
	    	}
		}
	},

	title: {
		text: ''
	},

	credits: {
		enabled: false
	},

	legend: {
		enabled: true
	},

	xAxis: {
		categories: xAxisCategories,
		title: {
			text: 'Assay group'
		}
	},

	yAxis: {
		title: {
			text: 'Expression (TPM)'
		},
		type: useLogarithmicAxis?'logarithmic':'',
		min:0.1
	}
	,


	plotOptions: {
		column: {
            grouping: false,
            shadow: false,
        },
		series: {
            events: {
                legendItemClick: function () {
                        return false;
                }
            }
        }
	},
})
const boxPlotConfig = ({xAxisCategories, dataSeries,useLogarithmicAxis}) => Object.assign(
	baseConfig({xAxisCategories,useLogarithmicAxis}),{
    series: dataSeries
})

//TODO tooltip
const plotConfig = ({xAxisCategories, dataSeries,useLogarithmicAxis}) => Object.assign(
	baseConfig({xAxisCategories,useLogarithmicAxis}),{
    series: dataSeries
})

const scatterPlotConfig = ({xAxisCategories, dataSeries,useLogarithmicAxis}) => Object.assign(
	baseConfig({xAxisCategories,useLogarithmicAxis}),{
    series: dataSeries,
	marker: {
		lineWidth: 1,
		lineColor: ReactHighcharts.Highcharts.getOptions().colors[0]
	},
	tooltip: {
        pointFormat: 'Expression: {point.y} TPM <br/> Assay:  {point.info.assays}'
    }
})

const SelectTranscripts = ({rowNames,currentRowNames, onChangeCurrentRowNames}) => (
	<ReactSelect
	name=""
	options={rowNames.map(name => ({label:name, value:name}))}
	multi={true}
	onChange={x => {onChangeCurrentRowNames(x.map(xx=> xx.value))}}
	value={currentRowNames}
	/>
)

const boxPlotDataSeries = ({rows}) => (
	rows.map(({id, name, expressions}) => ({
		name: id,
		data: expressions.map(
					({values, stats}) =>(
				stats
				? [stats.min, stats.lower_quartile, stats.median, stats.upper_quartile, stats.max]
				: []
			))
	}))
)
const BoxPlot = ({rows,columnHeaders,useLogarithmicAxis}) => (
	<div key={`boxPlot`}>
	  {rows.length && <ReactHighcharts config={boxPlotConfig({
		  useLogarithmicAxis,
		  xAxisCategories: columnHeaders.map(({id})=>id),
		  dataSeries: boxPlotDataSeries({rows})
	  })}/>}
	</div>
)

const scatterDataSeries = ({rows, useLogarithmicAxis}) => { return (
	rows.map(({id, name, expressions},rowIndex) => ({
		type: 'scatter',
		name: id+SUFFIX,
		data:
		  [].concat.apply([],
			 expressions.map(({values, stats}, ix) =>(
			  values
			  ? values
				  .filter(({value})=> !useLogarithmicAxis || value >0)
				  .map(({value, id, assays})=>({
					  x:ix,
					  y:value,
					  color: ReactHighcharts.Highcharts.getOptions().colors[rowIndex],
					  info: {id, assays}
				  }))
			  : []
			))),
		marker: {
		   fillColor: 'white',
		   lineWidth: 1,
		   lineColor: ReactHighcharts.Highcharts.getOptions().colors[rowIndex]
		},
		tooltip: {
		   pointFormat: 'Expression: {point.y} TPM <br/> Assay:  {point.info.assays}'
		}

	}))
)}

const ScatterPlot = ({rows,columnHeaders,useLogarithmicAxis}) => (
	<div key={`scatterPlot`}>
	  {rows.length && <ReactHighcharts config={scatterPlotConfig({
		  useLogarithmicAxis,
		  xAxisCategories: columnHeaders.map(({id})=>id),
		  dataSeries: scatterDataSeries({rows,useLogarithmicAxis})
	  })}/>}
	</div>
)
const DISPLAY_PLOT_TYPE = {
	BOX:1, SCATTER:2, BOTH:3
}
/*
<div>
	<span className="switch">
		<input className="switch-input" id={DISPLAY_PLOT_TYPE.BOX} type="radio" checked={toDisplay==DISPLAY_PLOT_TYPE.BOX} onChange={onChangeToDisplay.bind(this, DISPLAY_PLOT_TYPE.BOX)}  name="s"/>
		<label className="switch-paddle" htmlFor={DISPLAY_PLOT_TYPE.BOX}>
		</label>
	</span>
	<span style={{margin:"1rem",fontSize:"large",verticalAlign:"top"}}>Expression values: boxplot summarizing assays for each assay group </span>
</div>
<div>
	<span className="switch">
		<input className="switch-input" id={DISPLAY_PLOT_TYPE.SCATTER} type="radio" checked={toDisplay==DISPLAY_PLOT_TYPE.SCATTER} onChange={onChangeToDisplay.bind(this, DISPLAY_PLOT_TYPE.SCATTER)} name="s"/>
		<label className="switch-paddle" htmlFor={DISPLAY_PLOT_TYPE.SCATTER}>
		</label>
	</span>
	<span style={{margin:"1rem",fontSize:"large",verticalAlign:"top"}}>Expression values: a dot per biological replicate for each assay group</span>
</div>
<div>
	<span className="switch">
		<input className="switch-input" id={DISPLAY_PLOT_TYPE.BOTH} type="radio" checked={toDisplay==DISPLAY_PLOT_TYPE.BOTH} onChange={onChangeToDisplay.bind(this, DISPLAY_PLOT_TYPE.BOTH)} name="s"/>
		<label className="switch-paddle" htmlFor={DISPLAY_PLOT_TYPE.BOTH}>
		</label>
	</span>
	<span style={{margin:"1rem",fontSize:"large",verticalAlign:"top"}}>Expression values: both boxplots and dots</span>
</div>
<br/>
<div>
	<span className="switch">
		<input className="switch-input" id="c" type="checkbox" checked={useLogarithmicAxis} onChange={onChangeUseLogarithmicAxis.bind(this, !useLogarithmicAxis)} name="s"/>
		<label className="switch-paddle" htmlFor="c">
		</label>
	</span>
	<span style={{margin:"1rem",fontSize:"large",verticalAlign:"top"}}>Use logarithmic axis</span>
</div>
*/

const _Chart = ({rows,columnHeaders,toDisplay, onChangeToDisplay,useLogarithmicAxis,onChangeUseLogarithmicAxis}) => (
  	<div>
	<div key={`chart`}>
	  {rows.length && <ReactHighcharts config={plotConfig({
		  useLogarithmicAxis,
		  xAxisCategories: columnHeaders.map(({id})=>id),
		  dataSeries:
			  [].concat(
				  toDisplay == DISPLAY_PLOT_TYPE.SCATTER ? [] : boxPlotDataSeries({rows})
			  ).concat(
				  toDisplay == DISPLAY_PLOT_TYPE.BOX ? [] : scatterDataSeries({rows,useLogarithmicAxis})
			  )
	  })}/>}
	</div>
  </div>
)

const Chart = uncontrollable(_Chart, {toDisplay: 'onChangeToDisplay',useLogarithmicAxis:'onChangeUseLogarithmicAxis' })

Chart.defaultProps = {
	defaultToDisplay: DISPLAY_PLOT_TYPE.BOTH,
	defaultUseLogarithmicAxis:true,
}

const _ChartWithSwitcher = ({columnHeaders,rows,currentRows, defaultCurrentRows, onChangeCurrentRows}) => (
	<div>
	<h3>
		Show data for transcripts:
	</h3>
	 <SelectTranscripts
			rowNames={rows.map(row => row.id)}
			currentRowNames={currentRows.map(row => row.id)}
			onChangeCurrentRowNames={(rowNames) => { return onChangeCurrentRows(rows.filter(row => rowNames.includes(row.id)))}}
	/>
	<Chart rows={currentRows} columnHeaders={columnHeaders} />
	</div>
)

const ChartWithSwitcher = uncontrollable(_ChartWithSwitcher, {currentRows: "onChangeCurrentRows"})

const Main = ({columnHeaders, profiles:{rows}}) => (
	<div>
		<ChartWithSwitcher columnHeaders={columnHeaders} rows={rows} defaultCurrentRows={rows}  />
	</div>
)

export default Main
