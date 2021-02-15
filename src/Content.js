import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PredictionPage from '../src/Pages/Predictions.js';
import DataPage from '../src/Pages/Data.js';
import AnalysisPage from '../src/Pages/Analysis.js';

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function Content(props) {
    const { classes } = props;

    return (
        <div>
            {props.index === 0 && 
                <div><PredictionPage/></div>
            }
            {props.index === 1 && 
                <div><DataPage/></div>
            }
            {props.index === 2 && 
                <div><AnalysisPage/></div>
            }
        </div>
    );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);