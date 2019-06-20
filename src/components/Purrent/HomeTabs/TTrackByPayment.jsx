import React, { Component } from 'react'
import { Grid, Header, Form, FormGroup, Button, Table } from 'semantic-ui-react';
import axios from 'axios'
export default class TTrackByPayment extends Component {

    state = {
        visa: false,
        mc: false,
        debit: false,
        cash: false,
        transactions: []
    }

    makeFetch = async (data) => {
        console.log(data)
        var opts = {
            visa: '',
            mc: '',
            debit: '',
            cash: '',
        }
        if (this.state.visa) {
            opts.visa = "Visa"
        } if (this.state.mc) {
            opts.mc = "MasterCard"
        } if (this.state.debit) {
            opts.debit = "Debit"
        } if (this.state.cash) {
            opts.cash = "Cash"
        }
        console.log('what')
        await axios.post('/api/div/payment-method', opts)
            .then(res => {
                console.log(res.status)
                if (res.status === 200) {
                    this.setState({transactions: res.data})
                } if (res.status === 500) {
                    alert('server side error')
                } else if (res.status === 400) {
                    alert('client side error')
                }
            }).catch(error => {
                console.error(error);
            });

    }
    toggleVisa = (e) => {
        console.log(this.state)
        this.setState(prevState => ({ visa: !prevState.visa }))
    }
    toggleMC = (e) => {
        console.log(this.state)
        this.setState(prevState => ({ mc: !prevState.mc }))
    }
    toggleDebit = (e) => {
        console.log(this.state)
        this.setState(prevState => ({ debit: !prevState.debit }))
    }
    toggleCash = (e) => {
        console.log(this.state)
        this.setState(prevState => ({ cash: !prevState.cash }))
    }

    createItem = () => {
        let trans = this.state.transactions
        if (trans.length > 1) {
            let items = []
            for (var i = 0, len = trans.length; i < len; i++) {
                items.push(
                    <Table.Row key={trans[i].custid}>
                    <Table.Cell>{trans[i].custid}</Table.Cell>
                    {/* <Table.Cell>{trans[i].price}</Table.Cell>
                    <Table.Cell>{trans[i].date}</Table.Cell>
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
                    <Form>
                        <Header> Find Customers Who Only Pay With..</Header>
                        <FormGroup>
                            <Form.Field>
                                <label>Visa</label>
                                <input
                                    type='radio'
                                    value={this.state.visa}
                                    name='visa'
                                    checked={this.state.visa}
                                    onClick={this.toggleVisa} />
                            </Form.Field>
                            <Form.Field>
                                <label>MasterCard</label>
                                <input
                                    type='radio'
                                    value={this.state.mc}
                                    name='mc'
                                    checked={this.state.mc}
                                    onClick={this.toggleMC} />
                            </Form.Field>
                            <Form.Field>
                                <label>Debit</label>
                                <input
                                    type='radio'
                                    value={this.state.debit}
                                    name='debit'
                                    checked={this.state.debit}
                                    onClick={this.toggleDebit} />
                            </Form.Field>
                            <Form.Field>
                                <label>Cash</label>
                                <input
                                    type='radio'
                                    value={this.state.cash}
                                    name='cash'
                                    checked={this.state.cash}
                                    onClick={this.toggleCash} />
                            </Form.Field>
                        </FormGroup>
                        <Button onClick={() => this.makeFetch(this.state)}> Find Customers </Button>
                    </Form>
                </Grid.Row>
                <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Customer ID</Table.HeaderCell>
                    {/* <Table.HeaderCell>Start Date</Table.HeaderCell> */}
                    {/* <Table.HeaderCell>End Date</Table.HeaderCell> */}
                
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.createItem()}
                </Table.Body>
              </Table>
            </Grid>

        )
    }
}