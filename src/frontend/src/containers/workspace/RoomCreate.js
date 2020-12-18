import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {
    Button,
    Container,
    CssBaseline,
    FormControl,
    Grid,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel, Tooltip
} from "@material-ui/core";
import {WORKSPACE_PRIVATE_TOOLTIP} from "./tooltips";
import {createWorkspace} from "../../actions/chat";

const RoomCreate = ({ createWorkspace, workspace, room, errorMsg }) => {
    const [roomCreated, setRoomCreated] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        is_private: false,
    });
    const {name, is_private, password} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.checked});
    };

    const onSubmit = e => {
        e.preventDefault();
        createWorkspace(name, is_private, password);
        setRoomCreated(true);
    };

    if (roomCreated) {
        if (room) {
            return <Redirect to={`/${workspace}/${room}`} />
        }
    }

    return (
        <Container maxWidth='xs'>
            <CssBaseline/>
            <div className='form-wrapper'>
                <Typography component='h1' variant='h1'>
                    Workspace
                </Typography>
                <Typography component='subtitle1' variant='subtitle1'>
                    Create your Workspace
                </Typography>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <FormControl component="fieldset">
                        <TextField
                            required
                            fullWidth
                            variant='outlined'
                            margin='normal'
                            label="Name"
                            id="name"
                            placeholder="Name"
                            type='text'
                            name='name'
                            value={name}
                            onChange={e => onChange(e)}/>
                    </FormControl>
                    <FormControl component="fieldset">
                        <TextField
                            fullWidth
                            variant='outlined'
                            id='password'
                            margin='normal'
                            label="Password"
                            placeholder="Password"
                            type='text'
                            name='password'
                            minLength='6'
                            value={password}
                            onChange={e => onChange(e)}/>
                    </FormControl>
                    <FormControl component="fieldset" align='left'>
                        <Tooltip title={WORKSPACE_PRIVATE_TOOLTIP}>
                            <FormControlLabel
                                style={{display: "inline-flex", flexDirection:"row", margin: '0', padding: '10px 0'}}
                                value="start"
                                control={
                                    <Checkbox name='is_private'
                                              checked={formData.is_private}
                                              onChange={handleChange}
                                              color="primary"
                                    />
                                }
                                label="Private"
                                labelPlacement="start"
                            />
                        </Tooltip>
                    </FormControl>
                    <Button color="primary" variant="contained" type='submit'>Create Workspace</Button>
                </form>
            </div>
        </Container>
    )
}

const mapStateToProps = state => ({
    workspace: state.chat.workspace,
    room: state.chat.currentRoom,
    errorMsg: state.auth.errorMsg,

})

export default connect(mapStateToProps, {createWorkspace})(RoomCreate);
