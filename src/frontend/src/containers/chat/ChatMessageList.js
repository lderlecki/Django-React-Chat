import React, {useEffect} from "react";
import {makeStyles, Typography} from "@material-ui/core";
import ChatMessage from "./ChatMessage";

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


const ChatMessageList = ({messages, currentRoom}) => {
   useEffect(() => {
       console.log('chatlistmessage')
       updateScroll()
   })

    const classes = styles()

    function updateScroll() {
        const element = document.getElementById('message-container');
        element.scrollTop = element.scrollHeight
    }

    console.log(messages)
    console.log(messages && messages.length)
    return messages && messages.length ? (
        <div id='message-container' className={classes.messagesWrapper}>
            {messages.map(message => (
                <ChatMessage  {...message} />
            ))}
        </div>
    ) : (
        <Typography variant="display1">There is no messages yet...</Typography>
    );


}

export default ChatMessageList;

