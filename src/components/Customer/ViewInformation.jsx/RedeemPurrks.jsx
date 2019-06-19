import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export default class RedeemPurks extends Component {

    componentDidMount() {
        fetch(' /api/customers/redeem-purrks')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            }).catch(error => {
                console.error(error);
              });
    }

    render() {
        return (
            <Grid>
                <Grid.Row centered>
                    <h> hello friends. display a table that shows the # points required for specific purrks (free floating table) </h>
                    <Link to='/customer'>
                        <Button color='yellow'> Click here to return home </Button>
                    </Link>
                </Grid.Row>
            </Grid>
        )
    }
}