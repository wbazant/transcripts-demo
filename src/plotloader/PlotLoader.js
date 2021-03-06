import React from 'react'
import PropTypes from 'prop-types'
import URI from 'urijs'

import LoadingOverlay from './LoadingOverlay'
import ScatterPlot from './ScatterPlot'

import SeriesPropTypes from './SeriesPropTypes'

const PlotLoader = ({loading, series, errorMessage, highchartsConfig, resourcesUrl, children, wrapperClassName, chartClassName}) =>
  errorMessage ?
    <div className={`${wrapperClassName} text-center scxa-error`}>
      <p>{errorMessage}</p>
    </div> :

    <div style={{position: `relative`}} className={wrapperClassName}>
      <ScatterPlot wrapperClassName={wrapperClassName}
                   chartClassName={chartClassName}
                   series={series}
                   highchartsConfig={highchartsConfig}
                   children={children}
      />
      <LoadingOverlay show={loading}
                      resourcesUrl={resourcesUrl}
      />
    </div>

PlotLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  series: SeriesPropTypes,
  errorMessage: PropTypes.string,
  highchartsConfig: PropTypes.object,
  chartClassName: PropTypes.string,
  resourcesUrl: PropTypes.string,
  children: PropTypes.object
}

PlotLoader.defaultProps = {
  wrapperClassName: ``,
  chartClassName: ``,
  highchartsConfig: {},
  resourcesUrl: ``
}

export default PlotLoader
