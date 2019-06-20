import React, { Component } from "react";
import { Grid, Form, FormField, Label, Header, FormGroup, Button, Table } from "semantic-ui-react";
import axios from 'axios'
export default class TSpecial extends Component {

  constructor(props) {
    super(props);
    this.state = {
      custid: null,
      start: null,
      end: null,
      ret: null
    }
  }

  makeFetch = async (data) => {
    console.log(data)
    await axios.post('/api/rental-between-dates')
        .then(res => {
          console.log(res)
            if (res.status === 200) {
               console.log(res.data)
               this.setState({ret: res.data})
            } if (res.status === 500) {
                alert('server side error')
            } else if (res.status === 400) {
                alert('client side error')
            }
        }).catch(error => {
            console.error(error);
        });

}

  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Form>
            <Header> Who Rented What During When????? </Header>
            <FormGroup>
              <FormField>
                <label> Customer ID: </label>
                <input
                  type='text'
                  name='custid'
                  placeholder='Enter a Customer ID'
                  onChange={this.handleTextChange}
                />
              </FormField>
              <FormField>
                <label> Start Date: </label>
                <input
                  type='text'
                  name='start'
                  placeholder='(YYYY-MM-DD)'
                  onChange={this.handleTextChange}
                />
              </FormField>
              <FormField>
                <label> End Date: </label>
                <input
                  type='text'
                  name='end'
                  placeholder='(YYYY-MM-DD)'
                  onChange={this.handleTextChange}
                />
              </FormField>
            </FormGroup>
            <Button onClick={() => this.makeFetch(this.state)}> Find Names </Button>
          </Form>
          <Table celled size='small'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Animal Name</Table.HeaderCell>
                <Table.HeaderCell>Start Date: </Table.HeaderCell>
                <Table.HeaderCell> End Date: </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  ho li fuk
        </Table.Cell>
                <Table.Cell>
                  2018-01-02
        </Table.Cell>
                <Table.Cell>
                  2018-02-01
        </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>ho my fuk</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>hwat le fuk</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Row>
      </Grid>
    )
  }

}