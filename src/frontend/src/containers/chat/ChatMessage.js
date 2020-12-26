import React from "react";
import {makeStyles, Typography} from "@material-ui/core";

const styles = makeStyles((theme) => ({
    messageWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
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


const ChatMessage = ({author, content, timestamp}) => {
    const classes = styles()
    return (
        <div className={classes.messageWrapper}>
            <Typography
                variant="caption"
                style={{color: 'gray'}}
                className={classes.statusMessageUser}
            >
                {author.name}
            </Typography>
            {/*{content}*/}
            {content}
            <Typography variant="caption" component="span">
                {timestamp}
            </Typography>
        </div>
    );
}

export default ChatMessage;

