import React, {Component, useEffect, useRef, useState} from 'react';

import {
    CircularProgress,
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
import {Link, Redirect, useHistory} from "react-router-dom";
import RoomPasswordFormDialog from "../../components/RoomPasswordDialog";
import history from "../../Routers/history";
import {connect} from "react-redux";


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

const ChatSidebar = ({chat, workspace, rooms, currentRoom, fetchRoom, verifyAccess, enterRoomWithPassword}) => {
    let history = useHistory();
    const classes = styles()
    const [roomCode, setRoomCode] = useState(currentRoom.code);

    const onRoomChange = (roomCode) => {
        verifyAccess(roomCode)
    }

    if(!chat.changingRoom && chat.hasRoomAccess) {
        if (roomCode !== currentRoom.code) {
            history.push(`/${chat.workspace}/${roomCode}`)
        }
    }

    const showDrawer = () => {
        return (
            <Drawer
                variant={"permanent"}
                containerStyle={{height: '100%', paddingTop: 64}}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {/* Render password form if no access */}
                {chat.hasRoomAccess ?
                    null :
                    <RoomPasswordFormDialog
                        history={history}
                        chat={chat}
                        roomCode={roomCode}
                        enterRoomWithPassword={enterRoomWithPassword}
                    />
                }
                {/* --------------------------------- */}
                <div className={classes.drawerHeader}>
                    <TextField
                        fullWidth
                        margin="normal"
                        placeholder=""
                        value={workspace}
                    />
                </div>
                <Divider/>
                <List>
                    {rooms && rooms.length ? (
                        rooms.map(room => (
                            <ListItem button onClick={() => {
                                setRoomCode(room.code)
                                onRoomChange(room.code)
                            }}>
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
        )}

    return (
        showDrawer()
    )
}

// const mapStateToProps = state => ({
//     chat: state.chat
// })

export default connect()(ChatSidebar)
