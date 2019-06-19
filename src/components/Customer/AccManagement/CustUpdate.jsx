import React, { Component } from 'react'
import { Form, Button, Grid, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import Axios from 'axios';

export default class CustUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custid: this.props.location.state,
      name: null,
      address: null,
      pnum: null,
    }
  }

  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  makeFetch = async (data) => {
    console.log(this.props.location.state)
    console.log(this.state.custid)
    const { history } = this.props
    await Axios.post('/api/customers/update', data)
    .then((res) => {
      if (res.status === 500) {
        alert('something wrong, try again')
      } else
        if (res.status === 200) {
          history.push('/customer', res.data)

        }
    }).catch(e => { 
      console.log(e)
    })
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

  //   Send req to server
  //   var request = new Request('http://localhost:3000/api/new-customer', {
  //     method: 'POST',
  //     header: new Headers({ 'Content-Type': 'application/json' }),
  //     body: JSON.stringify(data);
  //   });

  //   fetch(request)
  //     .then(function (response) {
  //       response.json().then(function (data) {
  //         console.log(data);
  //       })
  //     });
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
              <input type='number' name='custid' placeholder={this.state.custid} />
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
            <Link to='/customer'>
              <Button onClick={() => {
                console.log('validate customer table contain custid and then update')
                this.makeFetch(this.state)
              }}>
                Update </Button>
            </Link>
          </Form>
        </Grid.Row>
      </Grid>
    );
  };
}