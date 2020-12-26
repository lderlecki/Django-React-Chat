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

const Chat = ({currentRoom}) => {

    const classes = styles()
    return (
        <div className={classes.chatLayout}>

            <ChatMessageList
                messages={currentRoom.messages}
                currentRoom={currentRoom}
                // activeUser={activeUser}
            />

            {currentRoom && (
                <ChatMessageInput
                    messages={currentRoom.messages}
                    // disabled={!isConnected}
                    // sendMessage={sendMessage}
                    // eslint-disable-next-line
                    // activeUser={activeUser}
                />
            )}
        </div>
    );


}

export default Chat
