import React from 'react'
import PropTypes from 'prop-types'

import URI from 'urijs'

import ReactHighcharts from 'react-highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
HighchartsMore(ReactHighcharts.Highcharts)
import uncontrollable from 'uncontrollable'
import ReactSelect from 'react-select'
import 'react-select/dist/react-select.css';


const baseConfig = ({xAxisCategories,useLogarithmicAxis}) => ({
	chart: {
		type: 'boxplot',
		zoomType: 'x'
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
	},
})
const boxPlotConfig = ({xAxisCategories, dataSeries,useLogarithmicAxis}) => Object.assign(
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

const BoxPlot = ({rows,columnHeaders,useLogarithmicAxis}) => (
	<div key={`boxPlot`}>
	  {rows.length && <ReactHighcharts config={boxPlotConfig({
		  useLogarithmicAxis,
		  xAxisCategories: columnHeaders.map(({id})=>id),
		  dataSeries: rows.map(({id, name, expressions}) => ({
			  name: id,
			  data: expressions.map(
						  ({values, stats}) =>(
					  stats
					  ? [stats.min, stats.lower_quartile, stats.median, stats.upper_quartile, stats.max]
					  : []
				  ))
		  }))
	  })}/>}
	</div>
)

const ScatterPlot = ({rows,columnHeaders,useLogarithmicAxis}) => (
	<div key={`scatterPlot`}>
	  {rows.length && <ReactHighcharts config={scatterPlotConfig({
		  useLogarithmicAxis,
		  xAxisCategories: columnHeaders.map(({id})=>id),
		  dataSeries: rows.map(({id, name, expressions}) => ({
			  type: 'scatter',
			  name: id,
			  data:
			  	[].concat.apply([],
				   expressions.map(({values, stats}, ix) =>(
				  	values
				  	? values
						.filter(({value})=> !useLogarithmicAxis || value >0)
						.map(({value, id, assays})=>({
							x:ix,
							y:value,
							info: {id, assays}
						}))
				  	: []
				)))
		  }))
	  })}/>}
	</div>
)
const DISPLAY_PLOT_TYPE = {
	BOX:1, SCATTER:2
}
const _Chart = ({rows,columnHeaders,toDisplay, onChangeToDisplay,useLogarithmicAxis,onChangeUseLogarithmicAxis}) => (
	<div>
	<br/>
	<div>
		<span className="switch">
			<input className="switch-input" id="a" type="radio" checked={toDisplay==DISPLAY_PLOT_TYPE.BOX} onChange={onChangeToDisplay.bind(this, DISPLAY_PLOT_TYPE.BOX)}  name="s"/>
			<label className="switch-paddle" htmlFor="a">
			</label>
		</span>
		<span style={{margin:"1rem",fontSize:"large",verticalAlign:"top"}}>Expression values: aggregate</span>
	</div>
	<div>
		<span className="switch">
			<input className="switch-input" id="b" type="radio" checked={toDisplay==DISPLAY_PLOT_TYPE.SCATTER} onChange={onChangeToDisplay.bind(this, DISPLAY_PLOT_TYPE.SCATTER)} name="s"/>
			<label className="switch-paddle" htmlFor="b">
			</label>
		</span>
		<span style={{margin:"1rem",fontSize:"large",verticalAlign:"top"}}>Expression values: per assay</span>
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
		<div style={toDisplay == DISPLAY_PLOT_TYPE.BOX ? {} : {display: "none"}}>
			{BoxPlot({rows,columnHeaders,useLogarithmicAxis})}
		</div>
		<div style={toDisplay == DISPLAY_PLOT_TYPE.SCATTER ? {} : {display: "none"}}>
			{ScatterPlot({rows,columnHeaders,useLogarithmicAxis})}
		</div>
	</div>
)

const Chart = uncontrollable(_Chart, {toDisplay: 'onChangeToDisplay',useLogarithmicAxis:'onChangeUseLogarithmicAxis' })

Chart.defaultProps = {
	defaultToDisplay: DISPLAY_PLOT_TYPE.BOX,
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
