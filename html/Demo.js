import React from 'react'
import ReactDOM from 'react-dom'
import Main from '../src/index'
import URI from 'urijs'
import cannedProfiles from './canned.json'
const cannedJson = {
    columnHeaders: [{"id":"g1"},{"id":"g2"},{"id":"g3"},{"id":"g4"},{"id":"g5"},{"id":"g6"},{"id":"g7"},{"id":"g8"},{"id":"g9"},{"id":"g10"},{"id":"g11"},{"id":"g12"},{"id":"g13"},{"id":"g14"},{"id":"g15"}],
    profiles: cannedProfiles
}

import xhrRequest from 'xhr-request'


const fetchResponseJson = async (url, cb) => {
  //return cb(cannedJson)
  const response = await fetch(url)
  const responseJson = await response.json()
  cb(responseJson)
}

const ourUrl = (base, experiment, gene) => (
    URI(`json/debug-experiments/${experiment}/genes/${gene}/transcripts?type=RNASEQ_MRNA_BASELINE`, base).toString()
)

class Demo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      experimentAccession:"E-MTAB-4484",
      geneId:"TRIAE_CS42_1AL_TGACv1_000002_AA0000030",
      url:``,
      loading: false,
      data:{}
    }

    this._handleChangeExperiment = this._handleChangeExperiment.bind(this)
    this._handleChangeGeneId = this._handleChangeGeneId.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleChangeExperiment(event) {
    this.setState({
      experimentAccession: event.target.value
    })
  }
  _handleChangeGeneId(event) {
    this.setState({
      geneId: event.target.value
    })
  }

  _handleSubmit(event) {
    event.preventDefault()
    const url = ourUrl("https://www-test.ebi.ac.uk/gxa/", this.state.experimentAccession, this.state.geneId)

    this.setState({
      url: url,
      loading:true,
  }, fetchResponseJson.bind(this, url, (data) => this.setState({data:data, loading: false})))
  }



  render() {
    return(
      <div className={`row column`}>
        <div className={`row column`}>
          <form onSubmit={this._handleSubmit}>
            <label>Experiment</label>
            <input type={`text`} onChange={this._handleChangeExperiment} value={this.state.experimentAccession}/>
            <label>Gene id</label>
            <input type={`text`} onChange={this._handleChangeGeneId} value={this.state.geneId}/>
            <input className={`button`} type="submit" value="Go!" />
          </form>
        </div>

        { this.state.loading
            ?  `Loading from ${this.state.url} ...`
            : this.state.url
                ? <div>
                        <i>
                        Reading from:
                        {this.state.url}
                        </i>
                        <br/>
                        <Main {...this.state.data}

                        />
                    </div>
                : ""

        }
      </div>
    )
  }
}

const render = (options, target) => {
  ReactDOM.render(<Demo {...options} />, document.getElementById(target))
}

export {render}
