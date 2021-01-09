import React, {Fragment, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {connect} from 'react-redux';
import {logout} from '../actions/auth'
import {
    AppBar,
    Button, fade,
    IconButton,
    InputBase,
    makeStyles,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";
import SearchBar from 'material-ui-search-bar';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    userSection: {
        marginLeft: "auto",
    },
    title: {},
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(4),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

const Navbar = ({logout, isAuthenticated}) => {
    const classes = useStyles();
    const [data, setData] = useState({search: ''})

    let history = useHistory();

    const handleSearch = (e) => {
        history.push({
            pathname: '/search/',
            search: '?search=' + data.search
        })
    };

    return (

        <AppBar>
            <Toolbar>
                <Typography component={Link} to={'/'} variant="h6" className={classes.title}>
                    SuperChat
                </Typography>

                {isAuthenticated ? <>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        {/*<InputBase*/}
                        {/*    placeholder="Search for workspace"*/}
                        {/*    classes={{*/}
                        {/*        root: classes.inputRoot,*/}
                        {/*        input: classes.inputInput,*/}
                        {/*    }}*/}
                        {/*    value={data.search}*/}
                        {/*    onChange={*/}
                        {/*        (val) => setData({search:val.target.value})}*/}
                        {/*    onKeyPress={e => handleKeyPress(e)}*/}
                        {/*    // inputProps={{'aria-label': 'search'}}*/}
                        {/*/>*/}
                        <SearchBar
                            value={data.search}
                            onChange={(val) => setData({search: val})}
                            onRequestSearch={() => handleSearch(data.search)}
                        />
                    </div>
                    <div className={classes.userSection}>
                        <Button color='inherit' component={Link} to='/workspaces'>Workspaces</Button>
                        <Button color='inherit' component={Link} to='/' onClick={logout}>Logout</Button>
                    </div>
                </> : (
                    <div className={classes.userSection}>
                        <Button color='inherit' component={Link} to='/login'>Login</Button>
                        <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
        ;
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Navbar);
