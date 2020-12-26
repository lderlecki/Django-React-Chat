import React, {useEffect} from "react";
import {makeStyles, Typography} from "@material-ui/core";
import ChatMessage from "./ChatMessage";
import {Redirect} from "react-router-dom";

const styles = makeStyles((theme) => ({
    messagesWrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflowY: 'scroll',
        overflowX: 'hidden',
        height: '100%',
        width: '100%',
        paddingTop: theme.spacing.unit * 3,
        marginTop: "auto",
        paddingBottom: '120px',
    },
    paper: {
        padding: theme.spacing.unit * 3,
    },

}))


const ChatMessageList = ({match, currentRoom, messages}) => {
   useEffect(() => {
       updateScroll()
   })

    const classes = styles()

    function updateScroll() {
        const element = document.getElementById('message-container');
        element.scrollTop = element.scrollHeight
    }

    if (!currentRoom) {
        return <div>NO ROOM</div>
    }

    return messages && messages.length ? (
        <div id='message-container' className={classes.messagesWrapper}>
            {messages.map(message => (
                <ChatMessage  {...message} />
            ))}
        </div>
    ) : (
        <div id='message-container' className={classes.messagesWrapper}>
            <Typography variant="display1">There is no messages yet...</Typography>
        </div>
    );


}

export default ChatMessageList;

