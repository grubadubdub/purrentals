import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export default class viewInvoices extends Component {

    state = {
        custid: this.props.location.state,
        invoices: []
    }

    componentDidMount() {
        fetch('/customer-invoices')
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
                    <h>INVOICES FOR *THIS* CUSTOMER</h>
                    <Link to='/customer'>
                        <Button color='yellow'> Click here to return home </Button>
                    </Link>
                </Grid.Row>
            </Grid>
        )
    }
}

// const viewInvoices = () => (
//     <div>
//         hello
//     </div>
//     );

// export default viewInvoices;