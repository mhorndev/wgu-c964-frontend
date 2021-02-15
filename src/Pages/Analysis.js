import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, MenuList } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Plot from 'react-plotly.js';
import * as d3 from 'd3';
import dataSource from '../Data/insurance.csv';
import { sum } from 'd3';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  paper: {
      padding: 15,
  }
});

export default function AnalysisPage() {
    const classes = useStyles();
    const [data, setData] = useState([]);

    useEffect(() => {
        d3.csv(dataSource)
        .then(data => setData(data));
    }, []);

    return(
        <div className={classes.root}> 
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Analysis</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider light />
                </Grid>
                {data.length > 0 &&
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FeatureHeatmap data={data}/>
                        </Grid>
                        <Grid item xs={12}>
                            <AgeCostScatter data={data}/>
                        </Grid>
                        <Grid item xs={12}>
                            <BmiCostScatter data={data}/>
                        </Grid>
                        <Grid item xs={12}>
                            <MaleFemaleBoxPlot data={data}/>
                        </Grid>
                    </Grid>
                }
            </Grid> 
        </div>
    );
}

function AgeCostScatter(props) {
    const classes = useStyles();
    const [data, setData] = useState(props.data);
    const [x, setX] = useState([]);
    const [y, setY] = useState([]);
    const [xs, setXs] = useState([]);
    const [ys, setYs] = useState([]);

    useEffect(() => {
        var x = [];
        var y = [];
        var xs = [];
        var ys = [];

        for (var row in data) {
            if (data[row].smoker === 'no') {
                x.push(data[row].age);
                y.push(data[row].charges);
            } else {
                xs.push(data[row].age);
                ys.push(data[row].charges);
            }
        }
        setX(x);
        setY(y);
        setXs(xs);
        setYs(ys);

    }, []);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1">
                    Relationship between 'age' and 'charges'
                </Typography>
                <Divider light/>
                {data.length > 0 && x.length > 0 && y.length > 0 &&
                    <Plot
                        data={[
                        {
                            x: xs,
                            y: ys,
                            type: 'scatter',
                            mode: 'markers',
                            name: 'smoker',
                            marker: {color: 'red'},
                        },
                        {
                            x: x,
                            y: y,
                            type: 'scatter',
                            mode: 'markers',
                            name: 'non-smoker',
                            marker: {color: 'green'},
                        },
                        ]}
                        layout={ {
                            width: '100%',
                            xaxis: {
                                title: "Age"
                            },
                            yaxis: {
                                title: "Charges"
                            },
                            autosize: true,
                        } }
                        config={{responsive: true}}
                    />
                }
            </Paper>
        </div>
    );
}

function BmiCostScatter(props) {
    const classes = useStyles();
    const [data, setData] = useState(props.data);
    const [x, setX] = useState([]);
    const [y, setY] = useState([]);
    const [xs, setXs] = useState([]);
    const [ys, setYs] = useState([]);

    useEffect(() => {
        var x = [];
        var y = [];
        var xs = [];
        var ys = [];

        for (var row in data) {
            if (data[row].smoker === 'no') {
                x.push(data[row].bmi);
                y.push(data[row].charges);
            } else {
                xs.push(data[row].bmi);
                ys.push(data[row].charges);
            }
        }
        setX(x);
        setY(y);
        setXs(xs);
        setYs(ys);

    }, []);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1">
                    Relationship between 'bmi' and 'charges'
                </Typography>
                <Divider light/>
                {data.length > 0 && x.length > 0 && y.length > 0 &&
                    <Plot
                        data={[
                        {
                            x: xs,
                            y: ys,
                            type: 'scatter',
                            mode: 'markers',
                            name: 'smoker',
                            marker: {color: 'orange'},
                        },
                        {
                            x: x,
                            y: y,
                            type: 'scatter',
                            mode: 'markers',
                            name: 'non-smoker',
                            marker: {color: 'blue'},
                        },
                        ]}
                        layout={ {
                            width: '100%',
                            xaxis: {
                                title: "Bmi"
                            },
                            yaxis: {
                                title: "Charges"
                            },
                            autosize: true,
                        } }
                        config={{responsive: true}}
                    />
                }
            </Paper>
        </div>
    );
}

function FeatureHeatmap(props) {
    const classes = useStyles();
    const [data, setData] = useState(props.data);

    useEffect(() => {
        {/*

[[1.000000, -0.020856,  0.109272,  0.042469, -0.025019,  0.002127,  0.299008],
[-0.020856,  1.000000,  0.046371,  0.017163,  0.076185,  0.004588,  0.057292],
[0.109272,  0.046371,  1.000000,  0.012759,  0.003750,  0.157566,  0.198341],
[0.042469,  0.017163,  0.012759,  1.000000,  0.007673,  0.016569,  0.067998],
[-0.025019,  0.076185,  0.003750,  0.007673,  1.000000, -0.002181,  0.787251],
[0.002127,  0.004588,  0.157566,  0.016569, -0.002181,  1.000000, -0.006208],
[0.299008,  0.057292,  0.198341,  0.067998,  0.787251, -0.006208,  1.000000]]

        */}

    }, []);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1">
                    Relationship between all features.
                </Typography>
                <Divider light/>
                {data.length > 0 &&
                    <Plot
                        data={[
                        {
                            z: [[1.000000, -0.020856,  0.109272,  0.042469, -0.025019,  0.002127,  0.299008],
                                [-0.020856,  1.000000,  0.046371,  0.017163,  0.076185,  0.004588,  0.057292],
                                [0.109272,  0.046371,  1.000000,  0.012759,  0.003750,  0.157566,  0.198341],
                                [0.042469,  0.017163,  0.012759,  1.000000,  0.007673,  0.016569,  0.067998],
                                [-0.025019,  0.076185,  0.003750,  0.007673,  1.000000, -0.002181,  0.787251],
                                [0.002127,  0.004588,  0.157566,  0.016569, -0.002181,  1.000000, -0.006208],
                                [0.299008,  0.057292,  0.198341,  0.067998,  0.787251, -0.006208,  1.000000]],
                            x: Object.keys(props.data[0]),
                            y: Object.keys(props.data[0]),
                            type: 'heatmap',
                        },
                        ]}
                        layout={ {
                            width: '100%',
                            autosize: true,
                        } }
                        config={{responsive: true}}
                    />
                }
            </Paper>
        </div>
    );
}

function MaleFemaleBoxPlot(props) {
    const classes = useStyles();
    const [data, setData] = useState(props.data);
    const [x, setX] = useState([]);
    const [y, setY] = useState([]);
    const [xs, setXs] = useState([]);
    const [ys, setYs] = useState([]);

    useEffect(() => {
        var x = [];
        var y = [];
        var xs = [];
        var ys = [];

        for (var row in data) {
            if (data[row].smoker === 'no') {
                x.push(data[row].sex);
                y.push(data[row].charges);
            } else {
                xs.push(data[row].sex);
                ys.push(data[row].charges);
            }
        }
        setX(x);
        setY(y);
        setXs(xs);
        setYs(ys);

    }, []);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1">
                    Relationship between 'sex/gender' and 'charges'
                </Typography>
                <Divider light/>
                {data.length > 0 && x.length > 0 && y.length > 0 &&
                    <Plot
                        data={[
                        {
                            x: xs,
                            y: ys,
                            type: 'box',
                            name: 'smoker',
                            boxpoints: 'all'
                        },
                        {
                            x: x,
                            y: y,
                            type: 'box',
                            name: 'non-smoker',
                            boxpoints: 'all',
                        },
                        ]}
                        layout={ {
                            width: '100%',
                            xaxis: {
                                title: "Sex/Gender"
                            },
                            yaxis: {
                                title: "Charges"
                            },
                            autosize: true,
                        } }
                        config={{responsive: true}}
                    />
                }
            </Paper>
        </div>
    );
}