import React, {useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, CircularProgress, Container, CssBaseline, makeStyles} from "@material-ui/core";
import {load_workspaces} from "../../actions/chat";

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

const WorkspacesIndex = ({load_workspaces, auth, chat}) => {
    useEffect(() => {
        load_workspaces();
    }, []);

    const classes = useStyles();
    const showSpinner = (
        <CircularProgress/>
    )
    const generateTemplate = (workspace) => (
        // TODO: API call to /workspace.code/ and then return workspace rooms and the room,
        //  that user should be directed to
        <Link className={classes.itemLink} to={`/${workspace.code}`}>
            <div className={classes.itemBlock}>
                <div className={classes.item}>
                    <div style={{padding: "15px"}}>
                        <div className="workspace-item-name">{workspace.name}</div>
                        <div className="workspace-item-members">members</div>
                    </div>
                </div>
            </div>
        </Link>
    )

    const ShowUserWorkspaces = (props) => {
        return (
            <div className={classes.wrapper}>
                <section className={classes.list}>
                    <div className={classes.header}>
                        <h4>
                            Workspaces for <strong>{props.user.email}</strong>
                        </h4>
                    </div>
                    {
                        chat.workspaces.map((workspace) => (
                            generateTemplate(workspace)
                        ))
                    }
                </section>
                <div className={classes.createWorkspace}>
                    <span>Want to chat with different team?</span>
                    <Button variant="outlined" style={{backgroundColor: 'white', borderRadius: '10px'}}>
                        <Link to={'/workspaces/create'}>Create Workspace</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <Container align='center'>
            <CssBaseline/>
            {chat.workspacesLoaded ? (<ShowUserWorkspaces user={auth.user} />) : showSpinner}
        </Container>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    chat: state.chat,
})

export default connect(mapStateToProps, {load_workspaces})(WorkspacesIndex)


