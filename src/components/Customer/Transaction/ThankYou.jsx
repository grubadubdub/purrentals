import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Grid, Header, Button } from 'semantic-ui-react';

export default class ThankYou extends Component {

    render() {
        return (
            <Grid>
                <Grid.Row centered>
                <Header>
                    Thank you for supporting our PAWESOME FRIENDS
                </Header>
                <Link to='/customer'>
                    <Button color='yellow'> Click here to return home </Button>
                </Link>
                </Grid.Row>
            </Grid>
        )
    }
}