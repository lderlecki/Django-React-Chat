import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Container, makeStyles, CssBaseline, CircularProgress} from "@material-ui/core";
import {load_rooms_in_workspace} from "../../actions/chat";

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        width: '100%',
        maxWidth: '500px',
    },
    list: {
        margin: '55px 0',
        width: '100%',
        borderRadius: '5px',
        boxShadow: '0px 0px 15px 0px rgba(163, 163, 163, .5)'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        padding: '0 25px',
        justifyContent: 'left',

        borderBottom: 'solid 1px #4a5fc1',
    },
    item: {
        display: "flex",
        flexDirection: "column",
        // justifyContent: "left",
        // alignItems: "center",
        // backgroundColor: "red"

    },
    itemLink: {},
    itemBlock: {
        transition: "all .75s ease",
        display: "block",
        '&:hover': {
            backgroundColor: '#b7c3e1',
        }

    },
    createWorkspace: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: '5px',
        padding: '16px 25px',
        justifyContent: "space-between",
        backgroundColor: '#b7c3e1',
    }
})

const WorkspaceDetail = ({match, load_rooms_in_workspace, chat}) => {
    useEffect( () => {
        if (!chat.roomsLoaded) {
            load_rooms_in_workspace(match.params.workspace);
        }
    }, [chat.workspace])
    const classes = useStyles();
    const generateTemplate = (room) => (
        <a className={classes.itemLink} href='#!'>
            <div className={classes.itemBlock}>
                <div className={classes.item}>
                    <div style={{padding: "15px"}}>
                        <div className="workspace-item-name">{room.name}</div>
                        <div className="workspace-item-members">{room.users.length + 1} members</div>
                    </div>
                </div>
            </div>
        </a>
    )

    return (
        <Container align='center'>
            <CssBaseline/>
            {chat.roomsLoaded ?
                chat.rooms.map((room) => (generateTemplate(room)))
                :
                <CircularProgress/>
            }
        </Container>
    )

}

const mapStateToProps = state => ({
    chat: state.chat
})

export default connect(mapStateToProps, {load_rooms_in_workspace})(WorkspaceDetail);
