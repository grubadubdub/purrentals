import React, { Component } from 'react'
import { Button, Form, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class DeleteCust extends Component {
    state = {
        custid: ''
    }
    handleTextChange = e => {
        this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
    }

    makeFetch = async (data) => {
        // console.log('this is from a method') 
        const { history } = this.props;
        console.log(data)
        await Axios.post('/api/purrents/delete-cust', data)
          .then(response => {
            if (response.status === 500 || 
                response.status === 400) {
              alert('Something went wrong');
            } else if (response.status === 200) {
              history.push('/purrent', response.data);
            }
          }).catch(error => {
            console.log(error);
          });
      }

    render() {
        return (
        <Grid>
        <Grid.Row centered>
            <Header />
            <Form>
                <Form.Field>
                    <label htmlFor='empid'>Enter a 3 Digit Customer ID:</label>
                    <input
                        type='text'
                        placeholder='Customer ID'
                        name='custid'
                        onChange={this.handleTextChange} />
                </Form.Field>
                {/* <Link to='/purrent'> */}
                    <Button color='green' onClick={() => this.makeFetch(this.state)}> Delete Customer </Button>
                {/* </Link> */}
            </Form>
        </Grid.Row>
    </Grid>
        )
    }
}