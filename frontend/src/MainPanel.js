import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onProcessClick = this.onProcessClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.text !== prevProps.text) {
      this.setState({text: this.props.text});
    }
  }

  onProcessClick() {
    this.props.processText(this.state.text);
  }

  handleTextChange(event) {
    this.setState({
        text: event.target.value
    });
  }

  render() {
    const { classes, placeholder } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div>{placeholder}</div>
              <TextField fullWidth multiline rows={10} value={this.state.text} onChange={this.handleTextChange}/>
              <Button onClick={this.onProcessClick} color="primary" variant="contained" className={classes.button}>Process</Button>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MainPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  processText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  text: PropTypes.string
};

export default withStyles(styles)(MainPanel);
