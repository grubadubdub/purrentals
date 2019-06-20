import React, { Component } from 'react'
import { Button, Form, Grid, Header, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

/* i don't know if it's better to query the options from our db or to include them here.
it's much easier if we do it this way but idk if we'll get docked marks for hardcoding them
instead of querying them from our db */

const workerOptions = [
    { key: 1, text: 'Manager', value: 1 },
    { key: 2, text: 'Caretaker', value: 2 },
    { key: 3, text: 'Admin', value: 3 }
]

const blidOptions = [
    { key: 69, value: 69, text: 69 },
    { key: 70, value: 70, text: 70 },
    { key: 71, value: 71, text: 71 },
    { key: 72, value: 72, text: 72 },
    { key: 73, value: 73, text: 73 },
]

export default class AddEmp extends Component {
    state = {
        empid: null,
        addr: null,
        workertype: null,
        salary: null,
        blid: '000',
        phone: null
    }
    handleTextChange = e => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }
    handleDropdownChange = (e, data) => {
        this.setState({ [data.name]: data.value }, console.log(this.state))

    }
    makeFetch = async (data) => {
        // console.log('this is from a method') 
        const { history } = this.props;
        console.log(data)
        await Axios.post('/api/purrents/add', data)
          .then(response => {
            if (response.status === 500) {
              alert('Something went wrong');
            } else if (response.status === 200) {
              history.push('/purrent', response.data);
            }
          }).catch(error => {
            console.log(error);
          });
      }

    render() {
        // const { value } = this.state
        return (
            <Grid>
                <Grid.Row centered>
                    <Header />
                    <Form>
                        <Form.Field>
                            <label htmlFor='empid'>Enter a 3 Digit Employee ID:</label>
                            <input
                                type='text'
                                placeholder='Employee ID'
                                name='empid'
                                onChange={this.handleTextChange} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor='addr'>Address:</label>
                            <input
                                type='text'
                                placeholder='Enter Address'
                                name='addr'
                                onChange={this.handleTextChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor='addr'>Phone Number:</label>
                            <input
                                type='text'
                                placeholder='Enter a phone number'
                                name='phone'
                                onChange={this.handleTextChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor='workertype'> Type of Worker:</label>
                            <Dropdown
                                type='string'
                                placeholder='Select type of worker'
                                options={workerOptions}
                                name='workertype'
                                onChange={this.handleDropdownChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Salary:</label>
                            <input
                                type='text'
                                placeholder='Enter starting salary:'
                                name='salary'
                                onChange={this.handleTextChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Home Fungeon:</label>
                            <Dropdown
                                placeholder='Select a fungeon location'
                                options={blidOptions}
                                name='blid'
                                onChange={this.handleDropdownChange} />
                        </Form.Field>
                        {/* <Link to='/purrent'> */}
                            <Button color='green' onClick={() => {this.makeFetch(this.state)}}> Submit </Button>
                        {/* </Link> */}
                    </Form>
                </Grid.Row>
            </Grid>
        );
    };

}