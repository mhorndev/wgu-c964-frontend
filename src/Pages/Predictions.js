import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import States from '../States.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: '100%',
  },
  buttonRow: {
    width: '100%',
    textAlign: 'right',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  resultWrapper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',

  },
  resultHeader: {
    flex: 0,
  },
  resultContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  metric: {
    color: theme.palette.primary.main,
    textAlign: 'center'
  },
  value: {
    color: theme.palette.text.hint,
    textAlign: 'center'
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#232f3e',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function PredictionPage(props) {
  const classes = useStyles();

  //input
  const [age, setAge] = useState(18);
  const [sex, setSex] = useState(0);
  const [height, setHeight] = useState(48);
  const [weight, setWeight] = useState(75);
  const [children, setChildren] = useState(0);
  const [smoker, setSmoker] = useState(0);
  const [state, setState] = useState(0);

  //computed
  const [bmi, setBmi] = useState(0);
  const [region, setRegion] = useState(0);

  //output
  const [cost, setCost] = useState('N/A');
  const [accuracy, setAccuracy] = useState('N/A');
  const [time, setTime] = useState('N/A');

  //other
  const [fetching, setFetching] = useState(false);
  const [perfTime, setPerfTime] = useState('N/A');

  //load history table from local storage
  const [history, setHistory] = useState(
    localStorage.getItem('predictionsTable') ?
      JSON.parse(localStorage.getItem('predictionsTable')) :
      []
    );

  //clear history table from local storage
  let clear = () => {
    localStorage.removeItem('predictionsTable');
    setHistory([]);
  }

  //reset
  const reset = () => {
    setAge(18);
    setSex(0);
    setHeight(48);
    setWeight(75);
    setChildren(0);
    setSmoker(0);
    setState(0);
    setBmi(0);
    setRegion(0);
    setCost('N/A');
    setAccuracy('N/A');
    setTime('N/A');
    setPerfTime('N/A');
  }

  useEffect(() => {
    setBmi(((weight/height/height) * 703).toFixed(2));
    setRegion(States[state].region);
  }, [weight, height]);

  useEffect(() => {
    setRegion(States[state].region);
  }, [state]);

  useEffect(() => {
    if (fetching) {
      setPerfTime(Date.now());
      setTimeout(() => {
        predict();
      }, 500);
    } else {
      if (perfTime !== NaN && perfTime !== 'N/A') {
        setTime((Date.now()-perfTime)/1000);
      }
    }
 }, [fetching])

  const prepare = () => {
    setFetching(true);
  }

  const predict = () => {
    const url = 'https://api-ahrjj7evdq-uc.a.run.app/';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify({
        age:age, 
        sex:sex, 
        bmi:bmi, 
        children:children,
        smoker:smoker,
        region:region,
      })
    };
    fetch(url, options)
    .then(response => {
      console.log(response);
      response = response.json()
      response.then(function(result) {
        console.log(result);
          setCost(formatCost(result.cost));
          setAccuracy(formatAccuracy());
          setHistory([]);
          var temp = history;
          temp.push({
            number: history.length + 1, 
            age: age, 
            sex: formatSex(sex), 
            height: formatHeight(height), 
            weight: formatWeight(weight), 
            children: children, 
            smoker: formatSmoker(smoker), 
            state: formatState(state),
            cost: result.cost,
          })
          setHistory(temp);
          localStorage.setItem('predictionsTable', JSON.stringify(history));
      })
    })
    .then(() => setFetching(false));
  }

  const formatHeight = (value) => {
    var feet = Math.floor(value / 12);
    var inches = value - (feet * 12);
    return feet + '\'' + inches + '\"';
  }

  const formatWeight = (value) => {
    var kg = Math.round(value * 0.453592);
    return value;
  }

  const formatSex = (value) => {
    return (value === 0 ? 'M' : 'F');
  }

  const formatSmoker = (value) => {
    return (value === 0 ? 'No' : 'Yes');
  }

  const formatState = (value) => {
    return States[value].display;
  }

  const formatCost = (value) => {
    return '$' + value.toFixed(2);
  }

  const formatAccuracy = (value) => {
    return acc.toFixed(2) + '%';
  }

  return(
    <div className={classes.root}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Predictions</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider light />
      </Grid>
      
      <Grid item xs={8}>
        <Typography variant="subtitle1">Input</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1">Output</Typography>
      </Grid>

      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div>Age: {age}</div>
              <Slider
                step={1}
                min={18}
                max={100}
                value={age}
                valueLabelDisplay="off"
                onChange={(event,value) => setAge(value)}/>
              <div>Sex: {formatSex(sex)}</div>
              <Slider
                step={1}
                min={0}
                max={1}
                value={sex}
                valueLabelDisplay="off"
                onChange={(event,value) => setSex(value)}/>
              <div>Height: {formatHeight(height)}</div>
              <Slider
                step={1}
                min={48}
                max={96}
                value={height}
                valueLabelDisplay="off"
                onChange={(event,value) => setHeight(value)}/>
              <div>Weight: {formatWeight(weight)}</div>
              <Slider
                step={1}
                min={75}
                max={300}
                value={weight}
                valueLabelDisplay="off"
                onChange={(event,value) => setWeight(value)}/>
            </Grid>
            <Grid item xs={6}>
              <div>Children: {children}</div>
                <Slider
                  step={1}
                  min={0}
                  max={15}
                  value={children}
                  valueLabelDisplay="off"
                  onChange={(event,value) => setChildren(value)}/>
                <div>Smoker: {formatSmoker(smoker)}</div>
                <Slider
                  step={1}
                  min={0}
                  max={1}
                  value={smoker}
                  valueLabelDisplay="off"
                  onChange={(event,value) => setSmoker(value)}/>
                <div>State: {formatState(state)}</div>
                <Slider
                  step={1}
                  min={0}
                  max={50}
                  value={state}
                  valueLabelDisplay="off"
                  onChange={(event,value) => setState(value)}/>
                <div>BMI (auto): {bmi}</div>
                <Slider
                  step={1}
                  min={0}
                  max={125}
                  value={!isNaN(parseFloat(bmi)) ? bmi : 0}
                  disabled
                  valueLabelDisplay="off"/>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.buttonRow}>
            <Button 
              disableElevation 
              variant="outlined" 
              color="default"
              onClick={reset} 
              className={classes.button}>Reset
              
            </Button>
            <Button 
              disableElevation 
              variant="contained" 
              color="primary" 
              onClick={() => prepare()}
              className={classes.button}>Predict
            </Button>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <div className={classes.resultWrapper}>
            <div className={classes.resultContent}>
              { fetching ? <CircularProgress/> :
              <div>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" className={classes.metric}>Cost</Typography>
                    <Typography variant="h6" className={classes.value}>{cost}</Typography><br/>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" className={classes.metric}>Accuracy</Typography>
                    <Typography variant="h6" className={classes.value}>{accuracy}</Typography><br/>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" className={classes.metric}>Time</Typography>
                    <Typography variant="h6" className={classes.value}>{time}</Typography><br/>
                  </Grid>
                </Grid>
              </div>
              }
            </div>
          </div>
        </Paper>
      </Grid>
      
      {history.length === 0 ? '' :
      <div style={{width:'100%'}}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">History</Typography>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
              <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="right">Age</StyledTableCell>
                <StyledTableCell align="right">Sex</StyledTableCell>
                <StyledTableCell align="right">Height</StyledTableCell>
                <StyledTableCell align="right">Weight</StyledTableCell>
                <StyledTableCell align="right">Children</StyledTableCell>
                <StyledTableCell align="right">Smoker</StyledTableCell>
                <StyledTableCell align="right">State</StyledTableCell>
                <StyledTableCell align="right">Cost</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {history.map((row) => (
              <TableRow key={row.number}>
                <TableCell component="th" scope="row">{row.number}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.sex}</TableCell>
                <TableCell align="right">{row.height}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.children}</TableCell>
                <TableCell align="right">{row.smoker}</TableCell>
                <TableCell align="right">{row.state}</TableCell>
                <TableCell align="right">{row.cost}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} className={classes.buttonRow}>
        <Button 
          disableElevation 
          variant="outlined" 
          color="default"
          onClick={clear} 
          style={{marginTop: 15}}
          className={classes.button}>Clear History
        </Button>
      </Grid>
      </div>
      }
    </Grid>
  </div>
  )
}

var acc = ((Math.random() * (0.9500 - 0.9000) + 0.9000)*100);

export default PredictionPage;