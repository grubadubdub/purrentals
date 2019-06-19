import React, { Component } from 'react'
import { Button, Form, Grid, Header, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const boolOptions = [
    { key: 1, text: 'Yes', value: 1 },
    { key: 0, text: 'No', value: 0 }
]

const payOptions = [
    { key: 'visa', value: 'visa', text: 'Visa' },
    { key: 'mc', value: 'mc', text: 'Mastercard' },
    { key: 'debit', value: 'debit', text: 'Debit' }
]

class NewPurchase extends Component {
    state = {
        custid: null,
        animalid: null,
        date: null,
        mchip: 0,
        insurance: 0,
        paymethod: null,
    }

    handleTextChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleDropdownChange = (data) => {
        this.setState({ [data.name]: data.value })
    }
    makeFetch(data) {
        console.log(data);
        var request = new Request('http://localhost:3000/api/customers/new-purrchase', {
            method: 'PUT',
            header: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });
        fetch(request)
            .then(response => {
                if (response.status === 200) {
                    console.log(response)
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
                    <Header />
                    <Form>
                        <Form.Field>
                            <label>CustID:</label>
                            <input placeholder={this.props.location.state} name='custid' onChange={this.handleTextChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>AnimalID:</label>
                            <input type='text' name='animalid' placeholder='AnimalID' onChange={this.handleTextChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Microchip:</label>
                            <Dropdown
                                placeholder='Please select an option'
                                options={boolOptions}
                                name='mchip'
                                onChange={this.handleDropdownChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Insurance:</label>
                            <Dropdown
                                placeholder='Please select an option'
                                options={boolOptions}
                                name='insurance'
                                onChange={this.handleDropdownChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Please select a payment method:</label>
                            <Dropdown
                                placeholder='Please select an option'
                                options={payOptions}
                                name='paymethod'
                                onChange={this.handleDropdownChange} />
                        </Form.Field>
                        <Link to='/customer-thank-you'>
                            <Button onClick={() => {
                                console.log(this.state)
                                console.log('validate animalid and custid exists, add to transaction and purchase tables')
                                this.makeFetch(this.state)
                                /* 
                                ~do request call ~
                                    if error response (
                                        display error
                                    ) else (
                                    navigate to /customer-thank-you
                                )
                            */
                            }}> Submit </Button>
                        </Link>
                    </Form>
                </Grid.Row>
            </Grid>
        );
    };
}

export default NewPurchase;
