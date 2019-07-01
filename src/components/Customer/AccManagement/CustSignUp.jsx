import React, { Component } from 'react'
import { Form, Checkbox, Button, Grid, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from 'axios';


class CustSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custid: null,
      name: null,
      address: null,
      pnum: null,
    }
  }


  handleTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }   

  async makeFetch(data) {
    const { history } = this.props
    const res = await axios.post('/api/customers/add', data);
    history.push('/customer-login')
  }

  render() {
    return (
      <Grid>
        <Header>

        </Header>
        <Grid.Row centered>
          <Form>
            <Form.Field>
              <label htmlFor="username">Username:</label>
              <input type='text' name='username' placeholder='Username' onChange={this.handleTextChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="password">Password:</label>
              <input type='text' name='password' placeholder='Password' onChange={this.handleTextChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="fname">First name:</label>
              <input type='text' name='fname' placeholder='First name' onChange={this.handleTextChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="lname">Last name:</label>
              <input type='text' name='lname' placeholder='Last name' onChange={this.handleTextChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="address">Address:</label>
              <input type='text' name='address' placeholder='Address' onChange={this.handleTextChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="pnum">Phone Number:</label>
              <input type='text' name='pnum' placeholder='Phone Number' onChange={this.handleTextChange} />
            </Form.Field>
            <Form.Field>
              <Checkbox checked='false' label='I agree to the Terms and Conditions. Sign my soul away.' />
            </Form.Field>
            {/* <Link to='/customer-login'> */}
            <Button onClick={() => {this.makeFetch(this.state)}}> Submit </Button>
            {/* </Link> */}
            {/* <Form success>
      <Message success header='Form Completed' content="You're all signed up!" />
      
    </Form> */}
          </Form>
        </Grid.Row>
      </Grid>
    );

  }
}


  export default CustSignUp;