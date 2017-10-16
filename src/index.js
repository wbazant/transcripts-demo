import React from 'react'
import PropTypes from 'prop-types'

import URI from 'urijs'

import ReactHighcharts from 'react-highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
HighchartsMore(ReactHighcharts.Highcharts)
import uncontrollable from 'uncontrollable'
import ReactSelect from 'react-select'
import 'react-select/dist/react-select.css';


// export default JSON.stringify

const highcharts = ({xAxisCategories, dataSeries}) => ({
    chart: {
        type: 'boxplot'
    },

    title: {
        text: 'Highcharts box plot styling'
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

    yAxis: [{
        title: {
            text: 'Expression value'
        }}]
    ,

    plotOptions: {
        boxplot: {
            fillColor: '#F0F0E0',
            lineWidth: 2,
            medianColor: '#0C5DA5',
            medianWidth: 3,
            stemColor: '#A63400',
            stemDashStyle: 'dot',
            stemWidth: 1,
            whiskerColor: '#3D9200',
            whiskerLength: '20%',
            whiskerWidth: 3
        }
    },

    series: dataSeries
})

const cannedHighcharts = highcharts({xAxisCategories: ['1', '2'],dataSeries : [{
	name: 'Observations',
	data: [
		[10, 20, 30, 40, 50],
		[1, 2, 3, 4, 5]
	]
},
		{
	name: 'Observations2',
	data: [
		[360, 801, 848, 895, 965],
		[733, 853, 939, 980, 1080]
	]
}]})


const SelectTranscripts = ({rowNames,currentRowNames, onChangeCurrentRowNames}) => (
	<ReactSelect
	name=""
	options={rowNames.map(name => ({label:name, value:name}))}
	multi={true}
	placeholder="Select your favourite(s)"
	onChange={x => {onChangeCurrentRowNames(x.map(xx=> xx.value))}}
	value={currentRowNames}
	/>
)
const Chart = ({rows}) => (
	<div>
		<div key={`chart`}>
	      <ReactHighcharts config={highcharts({
			  xAxisCategories: rows[0].expressions.map((e, ix) => "g"+ix),
			  dataSeries: rows.slice(0,3).map(({id, name, expressions}) => ({
				  name: id,
				  data: expressions.map(
							  ({values, stats}) =>(
						  stats
						  ? [stats.min, stats.lower_quartile, stats.median, stats.upper_quartile, stats.max]
						  : []
					  ))
			  }))
		  })}/>
	    </div>
	</div>
)

const _ChartWithSwitcher = ({rows,currentRows, defaultCurrentRows, onChangeCurrentRows}) => (
	<div>
	 <SelectTranscripts
			rowNames={rows.map(row => row.id)}
			currentRowNames={currentRows.map(row => row.id)}
			onChangeCurrentRowNames={(rowNames) => { return onChangeCurrentRows(rows.filter(row => rowNames.includes(row.id)))}}
	/>
	<Chart rows={currentRows} />
	</div>
)

const ChartWithSwitcher = uncontrollable(_ChartWithSwitcher, {currentRows: "onChangeCurrentRows"})

const Main = ({rows}) => (
	<div>
		<ChartWithSwitcher rows={rows} defaultCurrentRows={rows}  />
	</div>
)

export default Main

const fetchResponseJson = async (base, endpoint) => {
  const response = await fetch(URI(endpoint, base).toString())
  const responseJson = await response.json()
  return responseJson
}

class _Main extends React.Component {
	constructor(props) {
      super(props)
      this.state = {
        loaded: false,
		data: {}
      }
    }

	render() {
	  const {height, atlasUrl, resourcesUrl} = this.props
	  const {suggesterEndpoint, geneId, highlightClusters, ks, k, perplexities, perplexity} = this.props
	  const {onChangePerplexity, onChangeK, onSelectGeneId} = this.props
	  const {loadingClusters, loadingGeneExpression, data, errorMessage} = this.state

	  return (
		<div className={`row`}>
		  <div className={`small-12 medium-6 columns`}>
			<ClusterTSnePlot height={height}
							 plotData={data}
							 perplexities={perplexities}
							 perplexity={perplexity}
							 onChangePerplexity={onChangePerplexity}
							 ks={ks}
							 k={k}
							 onChangeK={onChangeK}
							 highlightClusters={highlightClusters}
							 loading={loadingClusters}
							 resourcesUrl={resourcesUrl}
							 errorMessage={errorMessage}
			/>
		  </div>

		  <div className={`small-12 medium-6 columns`}>
			<GeneExpressionTSnePlot height={height}
									plotData={data}
									atlasUrl={atlasUrl}
									suggesterEndpoint={suggesterEndpoint}
									onSelectGeneId={onSelectGeneId}
									geneId={geneId}
									highlightClusters={highlightClusters}
									loading={loadingGeneExpression}
									resourcesUrl={resourcesUrl}
									errorMessage={errorMessage}
			/>
		  </div>

		</div>
	  )
	}


}

class ExperimentPageView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        series: [],
        unit: ``
      },
      errorMessage: null,
      loadingClusters: false,
      loadingGeneExpression: false
    }
  }

  _fetchAndSetState({atlasUrl, experimentAccession, k, perplexity, geneId}) {
    const atlasEndpoint = `json/experiments/${experimentAccession}/tsneplot/${perplexity}/clusters/${k}/expression/${geneId}`

    return fetchResponseJson(atlasUrl, atlasEndpoint)
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          errorMessage: null,
          loadingClusters: false,
          loadingGeneExpression: false
        })
      })
      .catch((reason) => {
        this.setState({
          errorMessage: `${reason.name}: ${reason.message}`,
          loadingClusters: false,
          loadingGeneExpression: false
        })
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.atlasUrl !== this.props.atlasUrl ||  // First two will never happen but it’s the right thing to do
        nextProps.experimentAccession !== this.props.experimentAccession ||
        nextProps.perplexity !== this.props.perplexity ||
        nextProps.k !== this.props.k) {

      this.setState({
        loadingClusters: true,
        loadingGeneExpression: true
      })
      this._fetchAndSetState(nextProps)

    } else if (nextProps.geneId !== this.props.geneId) {

      this.setState({
        loadingGeneExpression: true
      })
      this._fetchAndSetState(nextProps)

    }
  }

  componentDidMount() {
    this.setState({
      loadingClusters: true,
      loadingGeneExpression: true
    })
    // Having _fetchAndSetState as callback is the right thing, but then we can’t return the promise; see tests
    return this._fetchAndSetState(this.props)
  }

  render() {
    const {height, atlasUrl, resourcesUrl} = this.props
    const {suggesterEndpoint, geneId, highlightClusters, ks, k, perplexities, perplexity} = this.props
    const {onChangePerplexity, onChangeK, onSelectGeneId} = this.props
    const {loadingClusters, loadingGeneExpression, data, errorMessage} = this.state

    return (
      <div className={`row`}>
        <div className={`small-12 medium-6 columns`}>
          <ClusterTSnePlot height={height}
                           plotData={data}
                           perplexities={perplexities}
                           perplexity={perplexity}
                           onChangePerplexity={onChangePerplexity}
                           ks={ks}
                           k={k}
                           onChangeK={onChangeK}
                           highlightClusters={highlightClusters}
                           loading={loadingClusters}
                           resourcesUrl={resourcesUrl}
                           errorMessage={errorMessage}
          />
        </div>

        <div className={`small-12 medium-6 columns`}>
          <GeneExpressionTSnePlot height={height}
                                  plotData={data}
                                  atlasUrl={atlasUrl}
                                  suggesterEndpoint={suggesterEndpoint}
                                  onSelectGeneId={onSelectGeneId}
                                  geneId={geneId}
                                  highlightClusters={highlightClusters}
                                  loading={loadingGeneExpression}
                                  resourcesUrl={resourcesUrl}
                                  errorMessage={errorMessage}
          />
        </div>

      </div>
    )
  }

  componentDidCatch(error, info) {
    this.setState({
       errorMessage: `${error}`
     })
  }
}
