import React, { Component } from 'react'
import { Grid, Button, Item, Label, Icon, Table, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import Axios from 'axios';

export default class RedeemPurks extends Component {
   state = {
            custid: this.props.location.state,
            purrks: [],
        }
    

    async componentDidMount() {
        console.log(this.state)
        await Axios.post('/api/customers/redeem-purrks', this.state)
            .then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    this.setState({purrks: [response.data]})
                    console.log(this.state)
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            }).catch(error => {
                console.error(error);
              });
    }

    createItem = () => {
        let trans = this.state.purrks
        console.log(trans)
        if (trans.length > 0) {
            let items = []
            for (var i = 0, len = trans.length; i < len; i++) {
                console.log(trans[i].purrks)
                items.push(
                    <Table.Row key={trans[i].points_required}>
                    <Table.Cell>{trans[i].points_required}</Table.Cell>
                    <Table.Cell>{trans[i].info}</Table.Cell>
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
            <div>
                <Header>display all redeemables for dis customer</Header>
                <h1>{this.state.custid}</h1>
                <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Points Required</Table.HeaderCell>
                    <Table.HeaderCell>Redeemable</Table.HeaderCell>
                    {/* <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Animal ID</Table.HeaderCell>
                    <Table.HeaderCell>Customer ID</Table.HeaderCell> */}
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