import React from "react";
import {makeStyles} from "@material-ui/core";
import ChatMessageList from "./ChatMessageList";
import ChatMessageInput from "./ChatMessageInput";
import {connect} from "react-redux";

const styles = makeStyles((theme) => ({
    chatLayout: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: '64px',
        height: '100%',
        width: '100%',
        overflow: 'hidden',

    },

}))


const generateMessagesForTesting = (count) => {
    let messages = []
    for (let i = 0; i < count; i++) {
        messages.push({message: `Message ${i + 1}`})
    }
    return messages
}
const messages = generateMessagesForTesting(30);

const Chat = ({messages, currentRoom}) => {
    const classes = styles()
    return (
        <div className={classes.chatLayout}>
            {/*<div>*/}
                <ChatMessageList
                    messages={messages}
                    // activeUser={activeUser}
                />
            {/*</div>*/}

            {currentRoom && (
                <ChatMessageInput
                    messages={messages}
                    // disabled={!isConnected}
                    // sendMessage={sendMessage}
                    // eslint-disable-next-line
                    // activeUser={activeUser}
                />
            )}
        </div>
    );


}

const mapStateToProps = state => ({
    messages: messages
})

export default connect(mapStateToProps)(Chat)
