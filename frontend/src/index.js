import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import MainPanel from './MainPanel';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      placeholder: "Loading...",
      loaded: false,
    };
    this.processText = this.processText.bind(this);
  }

  processText(text) {
    fetch(this.props.endpoints.processText, {
      method: 'post',
      body: JSON.stringify({text: text})
    }).then(function(response) {
      // FIXME: hadnle errors
      return response.json();
    }).then(response => {
      this.setState({data: response})
    });
  }

  componentDidMount() {
    fetch(this.props.endpoints.loadCurrentText)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({placeholder: "Something went wrong"});
        }
        return response.json();
      })
      .then(response => {
        this.setState({data: response, loaded: true, placeholder: ''})
      });
  }

  render() {
    const { text } = this.state.data;
    return <MainPanel placeholder={this.state.placeholder}
                      text={text}
                      processText={this.processText}

    />;
  }
}

App.propTypes = {
  endpoints: PropTypes.object.isRequired,
};

const endpoints = {
  loadCurrentText: '/load_current_text/',
  processText: '/process_text/',
};

ReactDOM.render(<App endpoints={endpoints}/>, document.querySelector("#app"));
