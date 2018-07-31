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
      placeholder: "",
      loaded: false,
      similar: [],
      errors: [],
    };
    this.processText = this.processText.bind(this);
    this.getSimilarity = this.getSimilarity.bind(this);
    this.handleFailedRequest = this.handleFailedRequest.bind(this);
  }

  componentDidMount() {
    this.setState({placeholder: "Loading..."});
    $.get(this.props.endpoints.loadCurrentText, response => {
      this.setState({data: response, loaded: true, placeholder: ''});
      this.setState({placeholder: ""});
    }).fail(this.handleFailedRequest);
  }

  render() {
    const {text, sentences} = this.state.data;
    return <MainPanel placeholder={this.state.placeholder}
                      text={text}
                      sentences={sentences}
                      similar={this.state.similar}
                      processText={this.processText}
                      processSentence={this.getSimilarity}
                      errors={this.state.errors}

    />;
  }

  getSimilarity(sentenceId) {
    this.setState({errors: [], placeholder: "Loading...", similar: []});
    $.get(this.props.endpoints.getSimilarity, {sentence_id: sentenceId}, response => {
      this.setState({placeholder: ""});
      if (response.errors) {
        this.setState({errors: response.errors});
      } else {
        this.setState({similar: response.similar});
      }
    }).fail(this.handleFailedRequest);
  }

  processText(text) {
    // TODO: Add client side validation and do not send a lot of text to server
    this.setState({errors: [], placeholder: "Loading...", similar: []});
    $.post(this.props.endpoints.processText, {text: text}, response => {
      this.setState({placeholder: ""});
      if (response.errors) {
        this.setState({errors: response.errors});
      } else {
        this.setState({data: response});
      }
    }).fail(this.handleFailedRequest);
  }

  handleFailedRequest() {
    this.setState({
      errors: ["Internal Server Error"],
      placeholder: ""
    });
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
