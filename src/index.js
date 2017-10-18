import React from 'react'
import PropTypes from 'prop-types'

import URI from 'urijs'

import ReactHighcharts from 'react-highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
HighchartsMore(ReactHighcharts.Highcharts)
import uncontrollable from 'uncontrollable'
import ReactSelect from 'react-select'
import 'react-select/dist/react-select.css';


const highcharts = ({xAxisCategories, dataSeries}) => ({
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
		type:'logarithmic',
		min:0.1
	}
    ,

    plotOptions: {
    },

    series: dataSeries
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
const Chart = ({rows,columnHeaders}) => (
	<div>
		<div key={`chart`}>
	      {rows.length && <ReactHighcharts config={highcharts({
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
	</div>
)

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
