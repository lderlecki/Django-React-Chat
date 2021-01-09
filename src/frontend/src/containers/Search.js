import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog, DialogActions, DialogContent,
    DialogTitle,
    fade,
    makeStyles, TextField,
    Tooltip,
    Typography
} from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';

import {searchWorkspaces, joinWorkspace} from "../actions/chat";
import {WORKSPACE_PASSWORD_REQUIRED} from "../components/tooltips";
import DialogContentText from "@material-ui/core/DialogContentText";
import WorkspacePasswordDialog from "../components/WorkspacePasswordDialog";


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: '1rem',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",

    },
    card: {
        margin: "20px 10px",
        display: "flex",
        flexDirection: 'column',
        width: '21%',
        minWidth: '250px',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
            boxShadow: '0px 0px 15px 0px rgba(163, 163, 163, .5)'
        },
    },
    title: {
        fontSize: 14
    },

}));

const Search = ({chat, workspaces, searchWorkspaces, joinWorkspace}) => {
    const classes = useStyles();
    const [workspaceCode, setWorkspaceCode] = useState('');
    const [workspaceJoined, setWorkspaceJoined] = useState(false);
    const [workspacePasswordDialogOpen, setWorkspacePasswordDialogOpen] = useState(false)

    useEffect(() => {
        searchWorkspaces(window.location.search);

    }, [window.location.search]);


    const handleWorkspaceJoin = (workspace_code, password = null) => {
        joinWorkspace(workspace_code, password);
        setWorkspaceCode(workspace_code);
        setWorkspaceJoined(true);
    }

    const handleWorkspaceWithPasswordDialog = (code) => {
        setWorkspaceCode(code)
        setWorkspacePasswordDialogOpen(true)
    }

    if (chat.workspace && workspaceJoined) {
        return <Redirect to={`/${workspaceCode}`}/>
    }

    const renderButton = (code, passwordProtected) => (
        passwordProtected ? (
                <>
                    <WorkspacePasswordDialog
                        open={workspacePasswordDialogOpen}
                        setOpen={setWorkspacePasswordDialogOpen}
                        code={workspaceCode}
                        handleWorkspaceJoin={handleWorkspaceJoin}
                    />
                    <Tooltip title={WORKSPACE_PASSWORD_REQUIRED}>
                        <Button onClick={() => {handleWorkspaceWithPasswordDialog(code)}}>Join <LockIcon/></Button>
                    </Tooltip>
                </>
            ) :
            <Button onClick={(code) => handleWorkspaceJoin(code)}>Join</Button>
    )

    const renderWorkspaceCard = (data) => (
        <Card className={classes.card} variant={"outlined"}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Owner: {data.host.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    {data.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Members: {data.members}
                </Typography>
            </CardContent>
            <CardActions style={{marginTop: 'auto'}}>
                {renderButton(data.code, data.has_password)}
            </CardActions>
        </Card>
    )

    return (
        <div className={classes.root}>
            {workspaces.length ? workspaces.map((workspace) => renderWorkspaceCard(workspace)) : (
                <h1>No workspaces found</h1>)}
        </div>
    )

}

const mapStateToProps = (state) => ({
    chat: state.chat,
    workspaces: state.chat.searchWorkspaces
})

export default connect(mapStateToProps, {searchWorkspaces, joinWorkspace})(Search);
