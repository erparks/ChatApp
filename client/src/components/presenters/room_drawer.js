import React, { Component } from "react";
import { withStyles, Typography, Divider } from "@material-ui/core";
import { Drawer, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const styles = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  button: {
    width: "calc(100% - 10px)",
    margin: "5px"
  }
};

const RoomDrawer = ({ classes, rooms, addRoom }) => {
  return (
    <Drawer
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      variant="permanent"
      anchor="left"
    >
      <Typography align="center" variant="title">
        Chat App
      </Typography>
      <Divider />
      {rooms &&
        rooms.map((room, i) => (
          <Typography key={i} variant="subtitle1">
            {/* <Button className={classes.button} variant="outlined"> */}
            <NavLink to={"/" + room}>{room}</NavLink>
            {/* </Button> */}
          </Typography>
        ))}

      <Button
        className={classes.button}
        variant="outlined"
        onClick={() => addRoom("newRoomName")}
      >
        Add Room
      </Button>
    </Drawer>
  );
};

export default withStyles(styles)(RoomDrawer);
