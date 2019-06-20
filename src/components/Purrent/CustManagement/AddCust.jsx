import React, { Component } from 'react'
import { Form, Button, Grid, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { async } from 'q';

class AddCust extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custid: '',
      name: '',
      address: '',
      pnum: ''
    }
  }

  handleTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }   

  makeFetch = async (data) => {
    // console.log(this.state)
    const { history } = this.props
    const res = await axios.post('/api/customers/add', data);
    if (res.status === 200){
      alert('success')
          history.push('/purrent')
        } 
        else {
          console.log('o no')
        }

  }

  render() {
    return (
      <Grid>
        <Header>

        </Header>
        <Grid.Row centered>
          <Form>
            <Form.Field>
              <label htmlFor="custid">Enter a 3 Digit Number CustID:</label>
              <input type='number' name='custid' placeholder='CustID' onChange={this.handleTextChange}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="name">Name:</label>
              <input type='text' name='name' placeholder='Name' onChange={this.handleTextChange}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="address">Address:</label>
              <input type='text' name='address' placeholder='Address' onChange={this.handleTextChange}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="pnum">Phone Number:</label>
              <input type='number' name='pnum' placeholder='Phone Number' onChange={this.handleTextChange}/>
            </Form.Field>
            <Link to='/purrent'>
              <Button onClick={() => {this.makeFetch(this.state)}}>
                Add Customer </Button>
            </Link>
          </Form>
        </Grid.Row>
      </Grid>
    );
  };
}

export default AddCust;