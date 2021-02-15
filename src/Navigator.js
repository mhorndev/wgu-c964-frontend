import React, { useState } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';

import PredictionsIcon from '@material-ui/icons/SettingsEthernet';
import DatabaseIcon from '@material-ui/icons/Storage';
import AnalysisIcon from '@material-ui/icons/BubbleChart';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';

const styles = (theme) => ({
  categoryHeader: {
    backgroundColor: '#232f3e',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    boxShadow: '0 -1px 0 #404854 inset',
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  spacer: {
    marginTop: theme.spacing(2),
  }
});

function Navigator(props) {
    const { classes, ...other } = props;
    let [active, setActive] = useState(0);

    let change = (index) => {
        setActive(index);
        props.navigate(index);
    }

  return (
    <Drawer variant="permanent" {...other}>
        <AppBar
            component="div"
            className={classes.categoryHeader}
            color="primary"
            position="static"
            elevation={0}>
            <Toolbar>
                <Typography color="inherit" variant="h6" nowrap="true">
                    Menu
                </Typography>
            </Toolbar>
        </AppBar>

        <List disablePadding>
            <div className={classes.spacer}/>
            <ListItem 
                button 
                onClick={() => change(0)}
                className={clsx(classes.item, active===0 && classes.itemActiveItem)}>

                <ListItemIcon className={classes.itemIcon}>
                    <PredictionsIcon/>
                </ListItemIcon>
                <ListItemText classes={{primary: classes.itemPrimary}}>
                    Predictions
                </ListItemText>
            </ListItem>

            <ListItem 
                button 
                onClick={() => change(1)}
                className={clsx(classes.item, active===1 && classes.itemActiveItem)}>

                <ListItemIcon className={classes.itemIcon}>
                    <DatabaseIcon/>
                </ListItemIcon>
                <ListItemText classes={{primary: classes.itemPrimary}}>
                    Data
                </ListItemText>
            </ListItem>

            <ListItem 
                button 
                onClick={() => change(2)}
                className={clsx(classes.item, active===2 && classes.itemActiveItem)}>

                <ListItemIcon className={classes.itemIcon}>
                    <AnalysisIcon/>
                </ListItemIcon>
                <ListItemText classes={{primary: classes.itemPrimary}}>
                    Analysis
                </ListItemText>
            </ListItem>

            <Divider className={classes.divider} />
            <div className={classes.spacer}/>

            <ListItem button className={classes.item} onClick={props.logout}>
                <ListItemIcon className={classes.itemIcon}>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText classes={{primary: classes.itemPrimary}}>
                    Logout
                </ListItemText>
            </ListItem>
        </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);