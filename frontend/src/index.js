import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import $ from "jquery";

import MainPanel from './MainPanel';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      placeholder: "Loading...",
      loaded: false,
      similar: []
    };
    this.processText = this.processText.bind(this);
    this.getSimilarity = this.getSimilarity.bind(this);
  }

  getSimilarity(sentenceId) {
    $.get(this.props.endpoints.getSimilarity, {sentence_id: sentenceId}, response => {
      this.setState({similar: response.similar});
    });
  }

  processText(text) {
    fetch(this.props.endpoints.processText, {
      method: 'post',
      body: JSON.stringify({text: text}),
      credentials: 'include'
    }).then(function (response) {
      // FIXME: hadnle errors
      return response.json();
    }).then(response => {
      this.setState({data: response})
    });
  }

  componentDidMount() {
    fetch(this.props.endpoints.loadCurrentText, {
      credentials: 'include'
    }).then(response => {
      if (response.status !== 200) {
        return this.setState({placeholder: "Something went wrong"});
      }
      return response.json();
    }).then(response => {
      this.setState({data: response, loaded: true, placeholder: ''})
    });
  }

  render() {
    const {text, sentences} = this.state.data;
    return <MainPanel placeholder={this.state.placeholder}
                      text={text}
                      sentences={sentences}
                      similar={this.state.similar}
                      processText={this.processText}
                      processSentence={this.getSimilarity}

    />;
  }
}

App.propTypes = {
  endpoints: PropTypes.object.isRequired,
};

const endpoints = {
  loadCurrentText: '/load_current_text/',
  processText: '/process_text/',
  getSimilarity: '/get_similarity/',
};

ReactDOM.render(<App endpoints={endpoints}/>, document.querySelector("#app"));
