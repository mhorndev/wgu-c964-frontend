import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Hyperlink from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import 'fontsource-roboto';
import { Hidden } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { render } from "@testing-library/react";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    },
    body: {
        flexGrow: 1,
        minHeight: '100vh',
        backgroundColor: '#232f3e',
    },
    content: {
      top: '50%',
      left: '50%',
      position: 'absolute',
      transform: 'translate(-50%, -50%)'
    },
    form : {
      width: 275,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    textfield: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    button: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    title: {
      width: '100%',
      color: red,
      textAlign: 'center'
    }
  }));
  
  export default function Auth(props) {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [incorrect, setIncorrect] = useState(false);
  
    let validate = () => {
      if (
        username === 'c964user' && 
        password === 'c964password') {
        props.login();
      } else {
        setIncorrect(true);
      }
    }
  
    return (
        <div className={classes.body}>
        
      <div className={classes.content}>
        <form noValidate autoComplete="off" className={classes.form}>
          <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.title} gutterBottom>
              Login
            </Typography>
            <TextField 
              id="username"
              label="Username" 
              variant="outlined" 
              size="small" 
              value={username}
              className={classes.textfield}
              onChange={e => setUsername(e.target.value)}/>
  
            <TextField 
              id="password"
              label="Password" 
              variant="outlined" 
              size="small" 
              type="password" 
              value={password}
              className={classes.textfield}
              onChange={e => setPassword(e.target.value)}/>
              
            <Button 
              color="primary"
              variant="contained" 
              onClick={validate}
              className={classes.button}>
              Log in
            </Button>
  
            <div hidden={incorrect ? '' : 'hidden'}>
              <Alert severity="error">
                <strong>Incorrect Credentials:</strong><br/>
                Please contact your administrator.
              </Alert>
            </div>
  
          </Paper>
        </form>
      </div>
      </div>
    );
  }