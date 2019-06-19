import React, { Component } from 'react'
import { Form, Button, Grid, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default class AddCust extends Component {
  state = {
    custid: null,
    name: null,
    address: null,
    pnum: null,
  }
  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  makeFetch(data) {
    // console.log('this is from a method')
    console.log(data);
    var request = new Request('http://localhost:3000/api/customers/add', {
      method: 'POST',
      header: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data)
    });
    fetch(request)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
      // .then(response => {
      //   console.debug(response);
      //   // ...
      .catch(error => {
        console.error(error);
      });

  }
  // updateCustomer = (event) => {
  //   event.preventDefault();

  //   let data = {
  //     custid: this.refs.custid.value,
  //     name: this.refs.name.value,
  //     address: this.refs.address.value,
  //     phoneNum: this.refs.pnum.value
  //   }
  //   console.log(data);

  // Send req to server
  // var request = new Request('http://localhost:3000/api/new-customer', {
  //   method: 'POST',
  //   header: new Headers( { 'Content-Type': 'application/json'}),
  //   body: JSON.stringify(data);
  // });

  // fetch(request)
  // .then(function(response) {
  //   response.json().then(function(data) {
  //     console.log(data);
  //   })
  // });
  // };

  render() {
    return (
      <Grid>
        <Header>

        </Header>
        <Grid.Row centered>
          <Form>
            <Form.Field>
              <label htmlFor="custid">Enter a 3 Digit Number CustID:</label>
              <input type='number' name='custid' placeholder='CustID' />
            </Form.Field>
            <Form.Field>
              <label htmlFor="name">Name:</label>
              <input type='text' name='name' placeholder='Name' />
            </Form.Field>
            <Form.Field>
              <label htmlFor="address">Address:</label>
              <input type='text' name='address' placeholder='Address' />
            </Form.Field>
            <Form.Field>
              <label htmlFor="pnum">Phone Number:</label>
              <input type='number' name='pnum' placeholder='Phone Number' />
            </Form.Field>
            <Link to='/purrent'>
              <Button onClick={() => {
                console.log('validate customer table dont contain custid and then add')
                this.makeFetch(this.state);
              }}>
                Add Customer </Button>
            </Link>
          </Form>
        </Grid.Row>
      </Grid>
    );
  };
}