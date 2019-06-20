import React, { Component } from 'react'
import { Grid, Button, Table, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import Axios from 'axios';

export default class viewInvoices extends Component {

    state = {
        custid: this.props.location.state,
        trans: []
    }

    async componentDidMount() {
        console.log(this.state)
        await Axios.post('/api/invoice', this.state)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    console.log(this.state)
                    this.setState({trans: response.data})
                    
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            }).catch(error => {
                console.error(error);
              });
    }
    createItem = () => {
        let trans = this.state.trans
        console.log(trans)
        if (trans.length > 0) {
            let items = []
            for (var i = 0, len = trans.length; i < len; i++) {
                console.log(trans[i].purrks)
                items.push(
                    <Table.Row key={trans[i].invoiceid}>
                    <Table.Cell>{trans[i].invoiceid}</Table.Cell>
                    <Table.Cell>{trans[i].transid}</Table.Cell>
                    <Table.Cell>{trans[i].payment_method}</Table.Cell>
                    {/* <Table.Cell>{trans[i].date}</Table.Cell>
                    <Table.Cell>{trans[i].animalid}</Table.Cell>
                    <Table.Cell>{trans[i].custid}</Table.Cell> */}
                    </Table.Row>
                  )
            }
            return items
        }
    }
    render() {
        return (

            <Grid>
                <Grid.Row centered>
                <div>
                <Header>display all redeemables for dis customer</Header>
                <h1>{this.state.custid}</h1>
                <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Invoice ID</Table.HeaderCell>
                    <Table.HeaderCell>Trans ID</Table.HeaderCell>
                    <Table.HeaderCell>Payment Method</Table.HeaderCell>
                    {/* <Table.HeaderCell>Animal ID</Table.HeaderCell>
                    <Table.HeaderCell>Customer ID</Table.HeaderCell> */}
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.createItem()}
                </Table.Body>
              </Table>
            </div>
                    <h>INVOICES FOR *THIS* CUSTOMER</h>
                    <Link to={ {pathname: '/customer', state: this.state.custid }}>
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