import React, {useState} from "react";
import {Input, makeStyles, Paper} from "@material-ui/core";
import WebSocketInstance from "../../components/Websocket";

const styles = makeStyles((theme) => ({
    messageInputWrapper: {
        position: 'relative',
        // left: 'auto',
        // right: 0,
        // bottom: 0,
        width: 'calc(100% - 60px)',
        marginBottom: 80,
        // padding: theme.spacing.unit * 3,
    },
    messageInput: {
        padding: theme.spacing.unit * 2,
    },

}))


const ChatMessageInput = ({currentRoom, user,}) => {
    const [messageData, setMessageData] = useState({
        message: '',
    })
    const classes = styles()

    const onChange = e => setMessageData({...messageData, [e.target.name]: e.target.value})

    const handleKeyPress = (event) => {
        // event.preventDefault();
        if (event.key === 'Enter' && messageData.message) {
            // TODO: trim message and do other stuff so that the message does not have for e.g. unnecessary spaces
            sendMessageHandler(messageData.message)
            setMessageData({message: ''})
        }
    };


    const sendMessageHandler = (message) => {
        const msgObj = {
            author: user.email,
            content: message,
            room_code: currentRoom.code
        }
        WebSocketInstance.newChatMessage(msgObj);

    }

    return (
        <div className={classes.messageInputWrapper}>
            <Paper className={classes.messageInput} elevation={6}>
                <Input
                    fullWidth
                    name='message'
                    label='message'
                    id='message'
                    placeholder="Type your message…"
                    value={messageData.message}
                    onChange={e => onChange(e)}
                    onKeyPress={e => handleKeyPress(e)}
                />
            </Paper>
        </div>
    );
}

export default ChatMessageInput;
