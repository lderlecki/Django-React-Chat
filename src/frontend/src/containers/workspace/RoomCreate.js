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
    FormControlLabel,
    Tooltip, InputAdornment,
} from "@material-ui/core";
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import {WORKSPACE_PRIVATE_TOOLTIP} from "../../components/tooltips";
import {createRoom} from "../../actions/chat";

const RoomCreate = ({match, createRoom, room, errorMsg, previousRoom=null}) => {
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

     if (roomCreated) {
        if (previousRoom){
            if (room.code !== previousRoom.code){
                return <Redirect to={`/${match.params.workspace}/${room.code}`}/>
            }
        } else {
            if (room){
                return <Redirect to={`/${match.params.workspace}/${room.code}`}/>
            }
        }

    }
    const onSubmit = e => {

        e.preventDefault();
        createRoom(name, is_private, password, match.params.workspace)
            .then(() => {
                setRoomCreated(true);
            });
    };



    return (
        <Container maxWidth='xs'>
            <CssBaseline/>
            <div className='form-wrapper'>
                <Typography component='h1' variant='h1'>
                    Room
                </Typography>
                <Typography component='subtitle1' variant='subtitle1'>
                    Create room and invite your friends to have fun together!
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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <InfoRoundedIcon/>
                                    </InputAdornment>
                                )
                            }}
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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <LockRoundedIcon/>
                                    </InputAdornment>
                                )
                            }}
                            onChange={e => onChange(e)}/>
                    </FormControl>
                    <FormControl component="fieldset" align='left'>
                        <Tooltip title={WORKSPACE_PRIVATE_TOOLTIP}>
                            <FormControlLabel
                                style={{display: "inline-flex", flexDirection: "row", margin: '0', padding: '10px 0'}}
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
                    <Button color="primary" variant="contained" type='submit'>Create Room</Button>
                </form>
            </div>
        </Container>
    )
}

const mapStateToProps = state => ({
    room: state.chat.currentRoom,
    errorMsg: state.auth.errorMsg,

})

export default connect(mapStateToProps, {createRoom})(RoomCreate);
