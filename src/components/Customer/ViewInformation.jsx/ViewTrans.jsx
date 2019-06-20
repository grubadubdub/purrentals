import React, { Component } from 'react'
import { Item, Header, Table } from 'semantic-ui-react';
import axios from 'axios';
import { async } from 'q';
export default class ViewTrans extends Component {

    state = {
        custid: this.props.location.state,
        transactions: []
    }

    async componentDidMount() {
        await axios.post('/api/transactions', this.state)
        .then(res => {
            if (res.status === 200) {
                this.setState({transactions: res.data});
            } else 
                alert('ooops')
        });
    }

    createItem = () => {
        let trans = this.state.transactions
        if (trans.length > 1) {
            let items = []
            for (var i = 0, len = trans.length; i < len; i++) {
                items.push(
                    <Table.Row key={trans[i].transid}>
                    <Table.Cell>{trans[i].transid}</Table.Cell>
                    <Table.Cell>{trans[i].price}</Table.Cell>
                    <Table.Cell>{trans[i].date}</Table.Cell>
                    <Table.Cell>{trans[i].animalid}</Table.Cell>
                    <Table.Cell>{trans[i].custid}</Table.Cell>
                    </Table.Row>
                  )
            }
            return items
        }
    }
    
    render() {
        return (
            <div>
                <Header>display all transactions for dis customer</Header>
                <h1>{this.state.custid}</h1>
                <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Transaction ID</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Animal ID</Table.HeaderCell>
                    <Table.HeaderCell>Customer ID</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.createItem()}
                </Table.Body>
              </Table>
            </div>
        )
    }
}