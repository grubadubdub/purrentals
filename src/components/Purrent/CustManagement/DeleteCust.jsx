import React, { Component } from 'react'
import { Button, Form, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class DeleteCust extends Component {

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
                <Link to='/purrent'>
                    <Button color='green'> Delete Customer </Button>
                </Link>
            </Form>
        </Grid.Row>
    </Grid>
        )
    }
}