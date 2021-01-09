import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useState} from "react";
import {Button, TextField} from "@material-ui/core";

const WorkspacePasswordDialog = ({open, setOpen, code, handleWorkspaceJoin}) => {
    // TODO: how to handle dialogs for multiple workspaces...
    const [password, setPassword] = useState('');

    const handleClose = () => {
        setOpen(false)
        setPassword('')
    };

    const handleSubmit = () => {
        // enterRoomWithPassword(roomCode, password)
        // setPassword('')
    }

    // if (!chat.changingRoom && chat.roomPasswordCorrect) {
    //     history.push(`/${chat.workspace.code}/${roomCode}`)
    // }


    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Join Workspace</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To enter this workspace, please enter password here. If password is correct you will be redirected
                    to the workspace.
                </DialogContentText>
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {handleWorkspaceJoin(code, password)}} color="primary">
                    Join
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default WorkspacePasswordDialog
