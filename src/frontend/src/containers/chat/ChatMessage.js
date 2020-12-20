import React from "react";
import {makeStyles, Typography} from "@material-ui/core";

const styles = makeStyles((theme) => ({
    messageWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
    },
    messageWrappperFromMe: {
        justifyContent: 'flex-end',
    },
    message: {
        maxWidth: '70%',
        minWidth: '10%',
        padding: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 2,
    },
    messageFromMe: {
        marginRight: theme.spacing.unit * 2,
        backgroundColor: '#e6dcff',
    },
    statusMessage: {
        width: '100%',
        textAlign: 'center',
    },
    statusMessageUser: {
        display: 'inline',
    },
}));


const ChatMessage = ({message, currentRoom}) => {
    const classes = styles()

    return (
        <div className={classes.messageWrapper}>
            <Typography className={classes.statusMessage}>
                <Typography
                    variant="caption"
                    style={{color: 'gray'}}
                    className={classes.statusMessageUser}
                >
                    {/*{displayedName}*/}
                    sender name
                </Typography>
                {/*{content}*/}
                   {message}
                <Typography variant="caption" component="span">
                    {/*{moment(createdAt).fromNow()}*/}
                    Date created
                </Typography>
            </Typography>
        </div>
    );
}

export default ChatMessage;

