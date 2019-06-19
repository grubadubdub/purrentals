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
    const res = await axios.post('/api/customers/signup', data);
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
              <label htmlFor="custid">Enter a 3 Digit Number CustID:</label>
              <input type='text' name='custid' placeholder='CustID' onChange={this.handleTextChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="name">Name:</label>
              <input type='text' name='name' placeholder='Name' onChange={this.handleTextChange} />
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
              <Checkbox label='I agree to the Terms and Conditions, like do I even ohmagaaaawd' />
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