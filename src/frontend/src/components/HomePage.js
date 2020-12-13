import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonGroup, Grid, Link} from '@material-ui/core'

function HomePage() {
    return(
        <Grid container spacing={3} align="center">
            <Grid item xs={12}>
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join" component={Link}>
                      Join a Room
                    </Button>
                    <Button color="secondary" to="/create" component={Link}>
                      Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}
