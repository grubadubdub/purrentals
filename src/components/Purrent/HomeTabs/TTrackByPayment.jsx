import React, { Component } from 'react'
import { Grid, Header, Form, FormGroup, Button, Table } from 'semantic-ui-react';
import axios from 'axios'
export default class TTrackByPayment extends Component {

    makeFetch = async (data) => {
        await axios.post('/api/div/payment-method')
            .then(res => {
                if (res.status === 200) {
                    /*do something wih response.json()*/
                    // console.log(response)
                    // return response.json();
                } if (res.status === 500) {
                    alert('server side error')
                } else if (res.status === 400) {
                    alert('client side error')
                }
            }).catch(error => {
                console.error(error);
            });

    }
    makeOpts() {
        let opts = {
            visa: '',
            mc: '',
            debit: '',
            cash: '',
        }
        if (this.state.visa) {
            opts.visa = "Visa"
        } if (this.state.mc) {
            opts.visa = "MasterCard"
        } if (this.state.debit) {
            opts.visa = "Debit"
        } if (this.state.cash) {
            opts.visa = "Cash"
        }
        this.makeFetch(opts);
    }
    state = {
        visa: false,
        mc: false,
        debit: false,
        cash: false,
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
                        <Button onClick={() => this.makeOpts}> Find Customers </Button>
                    </Form>
                </Grid.Row>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>CustID</Table.HeaderCell>
                            <Table.HeaderCell> Name </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                1
                </Table.Cell>
                            <Table.Cell>sum ting wong</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3</Table.Cell>
                            <Table.Cell>wit mai dik</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>8</Table.Cell>
                            <Table.Cell>it miss u</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Grid>

        )
    }
}