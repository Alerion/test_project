import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


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

  processSentence(sentenceId) {
    this.props.processSentence(sentenceId);
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
    const { classes, placeholder, sentences, similar} = this.props;
    const sentencesList = sentences.map((text, index) =>
      <ListItem button key={index}>
        <ListItemText primary={text} onClick={this.processSentence.bind(this, index)} />
      </ListItem>
    );
    const similarList = similar.map((item, index) =>
      <ListItem button key={index}>
        <ListItemText primary={item.sentence} secondary={item.value} />
      </ListItem>
    );

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
            <List component="nav">{sentencesList}</List>
          </Grid>
          <Grid item xs={6}>
            <List component="nav">{similarList}</List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

MainPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  processText: PropTypes.func.isRequired,
  processSentence: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  text: PropTypes.string,
  sentences: PropTypes.array,
  similar: PropTypes.array,
};

MainPanel.defaultProps = {
  text: '',
  sentences: [],
  similar: [],
};

export default withStyles(styles)(MainPanel);
