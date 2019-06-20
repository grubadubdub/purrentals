import React, { Component } from 'react'
import { Dropdown, Button, Form, Table, Header } from 'semantic-ui-react';
import axios from 'axios'

export default class TTransManagement extends Component {
    state = {
            search: '',
            input: '',
            transactions: [],
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
                    this.setState({transactions: res.data})
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
            </div>
        )
    }
}