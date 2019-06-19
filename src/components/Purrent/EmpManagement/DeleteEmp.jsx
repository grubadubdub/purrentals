import React, { Component } from 'react'
import { Button, Form, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class DeleteEmp extends Component {

    render() {
        return (
        <Grid>
        <Grid.Row centered>
            <Header />
            <Form>
                <Form.Field>
                    <label htmlFor='empid'>Enter a 3 Digit Employee ID:</label>
                    <input
                        type='text'
                        placeholder='Employee ID'
                        name='empid'
                        onChange={this.handleTextChange} />
                </Form.Field>
                <Link to='/purrent'>
                    <Button color='green'> Delete Employee </Button>
                </Link>
            </Form>
        </Grid.Row>
    </Grid>
        )
    }
}