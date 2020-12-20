import React, {Component, useEffect} from 'react';

import {
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";


const styles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: 320,
        backgroundColor: '#b7c3e1'
    },
    drawerHeader: {
        ...theme.mixins.toolbar,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },

}))

const ChatSidebar = ({workspace, currentRoom, rooms}) => {
    const classes = styles()

    return (
        <Drawer
            variant={"permanent"}
            containerStyle={{height: '100%', paddingTop: 64}}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <TextField
                    fullWidth
                    margin="normal"
                    placeholder="Search chats..."
                    value={workspace}
                    // onChange={this.handleSearchChange}
                />
            </div>
            <Divider/>
            <List>
                {rooms && rooms.length ? (
                    rooms.map(room => (
                        <ListItem button>
                            <ListItemText primary={room.name} secondary={room.code}/>
                        </ListItem>
                    ))
                ) : (
                    <Typography variant='subtitle1'>
                        No rooms yet
                    </Typography>
                )
                }

            </List>
        </Drawer>
    )
}

export default ChatSidebar
