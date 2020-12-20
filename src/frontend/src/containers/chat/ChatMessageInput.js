import React, {useState} from "react";
import {Input, makeStyles, Paper} from "@material-ui/core";

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


const ChatMessageInput = ({messages, send_message}) => {
    const [messageData, setMessageData] = useState({
        message: '',
    })
    const classes = styles()

    const onChange = e => setMessageData({...messageData, [e.target.name]: e.target.value})

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && messageData.message) {
            console.log(messages)
            messages.push({message: messageData})
            setMessageData({message: ''})
            console.log(messages)
        }
    };

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
