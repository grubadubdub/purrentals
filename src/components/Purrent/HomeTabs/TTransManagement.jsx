import React, { Component } from 'react'
import { Dropdown, Button, Form } from 'semantic-ui-react';

const searchOptions = [
    {key: 'name', value: 'name', text: 'Customer Name'},
    {key: 'custid', value: 'custid', text: 'Customer ID'},
    {key: 'transid', value: 'transid', text: 'Transaction ID'}
]

export default class TTransManagement extends Component {
    state = {
        search: null,
        input:''
    }

    handleDropdownChange = (e, data) => {
        this.setState({ [data.name]: data.value })
    }
    handleTextChange = e => {
        this.setState({[e.target.name]: e.target.value}, console.log(this.state))      
    }
    makeFetch(data) {
        console.log(data);
        var request = new Request('http://localhost:3000/transactions-all', {
            method: 'POST',
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
            // <div>
        
            //     <Button.Group basic attached='bottom'>
            <Form>
                <Form.Field>
                            <label>Select a search option:</label>
                            <Dropdown
                                placeholder='Please select an option'
                                options={searchOptions}
                                name='search'
                                onChange={this.handleDropdownChange} />
                        </Form.Field>
                <Form.Field>
                    <label htmlFor='input'>Search value:</label>
                    <input 
                        type='text' 
                        placeholder='Search value' 
                        name='input' 
                        onChange={this.handleTextChange}/>
                </Form.Field>
                <Button onClick={() => {
                                console.log(this.state)
                                this.makeFetch(this.state)
                            }}> Search </Button>
            </Form>
                )
            }
}