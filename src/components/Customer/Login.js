import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Grid, Header, Message, Image, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { async } from 'q';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: ''
    }
  }
  getID = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  makeFetch = async (data) => {
    const { history } = this.props
    const res = await axios.post('/api/customers/login', data);
    if (res.status === 500) {
      alert("some thing is wrong, try again")
    } else {
      if (res.status === 200) {
        this.setState({ name: res.data[0].username })
        // console.log('cust id: ' + res.data[0].custid + ', name: ' + this.state.name)
        this.props.history.push({
          pathname: '/customer',
          state: { 
            custid: res.data[0].custid,
            name: this.state.name }
        })
      }
    }
  }



  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='grey' textAlign='center'>
        <Image src='/logo.png' size='massive'/>
      </Header>
      <Form size='large'>
        <Segment stacked color='grey'>
          <Form.Input 
            fluid 
            icon='user' 
            iconPosition='left' 
            placeholder='Username' 
            name='username'
            onChange={this.getID}/>
          <Form.Input
            fluid
            icon='lock'
            name='password'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.getID}/>
          <Button onClick={() => this.makeFetch(this.state)} color='grey' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
</Grid>
    );
  };
}