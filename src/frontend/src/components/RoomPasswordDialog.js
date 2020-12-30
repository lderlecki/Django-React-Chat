import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useState} from "react";
import {Button, TextField} from "@material-ui/core";

const RoomPasswordFormDialog = ({history, chat, roomCode, enterRoomWithPassword}) => {
    const [open, setOpen] = useState(true);
    const [password, setPassword] = useState('');

    const handleClose = () => {
        setOpen(false);
        // todo: stay on current page and dispatch change room fail
    };
    const onChange = e => setPassword(e.target.value)

    const handleSubmit = () => {
        enterRoomWithPassword(roomCode, password)
        setPassword('')
    }

    if (!chat.changingRoom && chat.roomPasswordCorrect) {
        history.push(`/${chat.workspace}/${roomCode}`)
    }


    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">Enter room</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To enter this room, please enter password here. If password is correct you will be
                            redirected
                            to the room.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="password"
                            label="Password"
                            placeholder="Room password..."
                            type="text"
                            value={password}
                            onChange={e => onChange(e)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type={"submit"}  color="primary">
                            Enter
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
export default RoomPasswordFormDialog
