import React, { Component } from 'react'
import { Dropdown, Button, Form } from 'semantic-ui-react';
import axios from 'axios'

export default class TTransManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            input: ''
        }
    }
    searchOptions = [
        { key: 'name', text: 'Customer Name', value: 'name' },
        { key: 'custid', text: 'Customer ID', value: 'custid' },
        { key: 'transid', text: 'Transaction ID', value: 'transid' }
    ]
    
    handleDropdownChange = (e, data) => {
        this.setState({ [data.name]: data.value }, console.log(this.state))

    }
    handleTextChange = e => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }
    makeFetch = async (data) => {
        console.log(data)
        await axios.post('/api/transactions-all', data)
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
    render() {
        return (
            // <div>

            //     <Button.Group basic attached='bottom'>
            <Form>
                <Form.Field>
                            <label htmlFor='search'>Search by:</label>
                            <Dropdown
                                type='text'
                                placeholder='Select type of data to search'
                                name='search'
                                options={this.searchOptions}
                                onChange={this.handleDropdownChange}
                            />
                        </Form.Field>
                <Form.Field>
                    <label htmlFor='input'>Search value:</label>
                    <input
                        type='text'
                        placeholder='Search value'
                        name='input'
                        onChange={this.handleTextChange} />
                </Form.Field>
                <Button onClick={() => {
                    console.log(this.state)
                    this.makeFetch(this.state)
                }}> Search </Button>
            </Form>
        )
    }
}