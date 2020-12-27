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
    const getDisplayDate = (timestamp) => {
        const dateObj = new Date(timestamp);
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();

        return year + "/" + month + "/" + day;
    }

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
            {content}
            <Typography variant="caption" component="span">
                {getDisplayDate(timestamp)}
            </Typography>
        </div>
    );
}

export default ChatMessage;

