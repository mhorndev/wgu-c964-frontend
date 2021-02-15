import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';

import * as d3 from 'd3';
import dataSource from '../Data/insurance.csv';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tableHeader: {
      backgroundColor: 'blue'
  },
  footer: {
      width: '100%',
      textAlign: 'center'
  },
  footerText: {
      color: '#666666'
  },
  paper: {
      padding: 10,
      height: '100%'
  }
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const preventDefault = (event) => event.preventDefault();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    useEffect(() => {
        d3.csv(dataSource).then(data => setData(data));
    }, []);

  useEffect(() => {

  }, [data]);

  return (
    <div className={classes.root}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Data</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider light />
            </Grid>
            <Grid item xs={12}>
                
            </Grid>
        </Grid>
        <Paper>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
                <TableCell align="left">age</TableCell>
                <TableCell align="right">sex</TableCell>
                <TableCell align="right">bmi</TableCell>
                <TableCell align="right">children</TableCell>
                <TableCell align="right">smoker</TableCell>
                <TableCell align="right">region</TableCell>
                <TableCell align="right">charges</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox">
                    <TableCell component="th" scope="row">{row.age}</TableCell>
                    <TableCell align="right">{row.sex}</TableCell>
                    <TableCell align="right">{row.bmi}</TableCell>
                    <TableCell align="right">{row.children}</TableCell>
                    <TableCell align="right">{row.smoker}</TableCell>
                    <TableCell align="right">{row.region}</TableCell>
                    <TableCell align="right">{row.charges}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 25, 100]}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </Paper>
      <div className={classes.root}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Divider light/>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h6">Column Descriptions</Typography>
                    <ul>
                    <li><strong>age: </strong>Age of primary beneficiary</li>
                    <li><strong>sex: </strong>Male or female</li>
                    <li><strong>bmi: </strong>Body mass index, (kg/m^2) or (w/h^2)*703</li>
                    <li><strong>children: </strong>Number of children/dependents</li>
                    <li><strong>smoker: </strong>Is the beneficiary a smoker or non-smoker</li>
                    <li><strong>region: </strong>Residential area in the US</li>
                    <li><strong>charges: </strong>Medical costs billed by health insurance</li>
                    </ul>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h6">Notes</Typography>
                    <ul>
                    <li>The dataset displayed is in raw form. It has not been cleaned and
                    is not representative of the final data the prediction model sets are based on.</li>
                    <p>
                    <li>The dataset can be found at <br/>
                        <Link target="_blank" href="https://github.com/stedy/Machine-Learning-with-R-datasets/blob/master/insurance.csv">
                            https://github.com/stedy/Machine-Learning-with-R-datasets/blob/master/insurance.csv
                        </Link>
                    </li>
                    </p> 
                    </ul>
                </Paper>
            </Grid>
        </Grid>
      </div>
    </div>
  );
}

function createData(age, sex, bmi, children, smoker, region, charges) {
    return { age, sex, bmi, children, smoker, region, charges };
  }
  
