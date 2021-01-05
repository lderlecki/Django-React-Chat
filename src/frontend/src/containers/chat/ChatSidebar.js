import React, {Component, useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import {Link, Redirect, useHistory} from "react-router-dom";

import {
    Button,
    CircularProgress,
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem, ListItemAvatar,
    ListItemText, ListSubheader,
    makeStyles,
    TextField, Tooltip,
    Typography,
} from "@material-ui/core";

import LockIcon from '@material-ui/icons/Lock';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import AddIcon from '@material-ui/icons/Add';

import RoomPasswordFormDialog from "../../components/RoomPasswordDialog";
import history from "../../Routers/history";
import {ROOM_PASSWORD_REQUIRED} from "../../components/tooltips";

const styles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: 320,
        backgroundColor: '#A3B0FB'
    },
    drawerHeader: {
        ...theme.mixins.toolbar,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit,
    },
    roomAddBtn: {
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
    }

}))

const ChatSidebar = ({chat, workspace, rooms, currentRoom, fetchRoom, verifyAccess, enterRoomWithPassword}) => {
    let history = useHistory();
    const classes = styles()
    const [roomCode, setRoomCode] = useState(currentRoom.code);

    const onRoomChange = (roomCode) => {
        verifyAccess(roomCode)
    }

    if (!chat.changingRoom && chat.hasRoomAccess) {
        if (roomCode !== currentRoom.code) {
            history.push(`/${chat.workspace.code}/${roomCode}`)
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
                    <Typography component={'h5'} variant={'h5'}>
                        {workspace.name}
                    </Typography>
                </div>
                <Divider/>
                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <span>Rooms</span>
                                <div className={classes.roomAddBtn}>
                                    <Button
                                        style={{height: "1.5em"}}
                                        component={Link}
                                        to={{
                                            pathname: `/${workspace.code}/create`,
                                            query: chat.currentRoom,

                                        }}
                                    >
                                        <AddIcon/>
                                    </Button>
                                </div>
                            </div>

                        </ListSubheader>
                    }
                >
                    <Divider/>
                    {rooms && rooms.length ? (
                        rooms.map(room => (
                            <ListItem button onClick={() => {
                                setRoomCode(room.code)
                                onRoomChange(room.code)
                            }}>
                                <ListItemAvatar>
                                    {room.has_access ? (
                                        room.has_password ? <LockOpenOutlinedIcon/> : <ChatOutlinedIcon/>
                                    ) : (
                                        <Tooltip title={ROOM_PASSWORD_REQUIRED}>
                                            <LockIcon/>
                                        </Tooltip>
                                    )}
                                </ListItemAvatar>
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

    return (
        showDrawer()
    )
}

// const mapStateToProps = state => ({
//     chat: state.chat
// })

export default connect()(ChatSidebar)
