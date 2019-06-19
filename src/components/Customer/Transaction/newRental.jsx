import React, { Component } from 'react'
import { Dropdown, Button, Form, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const payOptions = [
    { key: 'visa', value: 'visa', text: 'Visa' },
    { key: 'mc', value: 'mc', text: 'Mastercard' },
    { key: 'debit', value: 'debit', text: 'Debit' }
]

class NewRental extends Component {

    state = {
        custid: this.props.location.state,
        animalid: null,
        start: null,
        end: null,
        paymethod: null,
    }

    handleTextChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleDropdownChange = (e, data) => {
        this.setState({ [data.name]: data.value })

    }
    makeFetch(data) {
        console.log(data);
        var request = new Request('http://localhost:3000/api/customers/new-rental', {
            method: 'PUT',
            header: new Headers( { 'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        });
        fetch(request)
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
                    <Header />
                    <Form>
                        <Form.Field>
                            <label>CustID:</label>
                            <input placeholder='CustID' name='custid' onChange={this.handleTextChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>AnimalID:</label>
                            <input type='text' name='animalid' placeholder='AnimalID' onChange={this.handleTextChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="pnum">Start Date:</label>
                            <input type='text' name='start' placeholder='(YYYY-MM-DD)' onChange={this.handleTextChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="pnum">Return Date:</label>
                            <input type='text' name='end' placeholder='(YYYY-MM-DD)' onChange={this.handleTextChange}/>
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
                                console.log('validate animalid and custid exists, add to transaction and rental tables')
                                this.makeFetch(this.state)
                            }}> Submit </Button>
                        </Link>
                    </Form>
                </Grid.Row>
            </Grid>
        );
    };
}

export default NewRental;
