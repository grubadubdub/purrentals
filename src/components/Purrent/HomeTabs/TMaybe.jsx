import React, { Component } from 'react'
import { Grid, Header, Form, FormGroup, FormField } from 'semantic-ui-react';

export default class Maybe extends Component {
    state = {
        pnum: false,
        addr: false,
        end: null,
    }
    togglePnum = (e) => {
        console.log(this.state)
        this.setState(prevState => ({ pnum: !prevState.pnum }))
    }
    toggleAddr = (e) => {
        console.log(this.state)
        this.setState(prevState => ({ addr: !prevState.addr }))
    }
    handleTextChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render(){
        return(
            <Grid>
                <h> we probably do not need this</h>
                <Grid.Row centered>
                    <Form>
                    <Header> Track down customers by due date</Header>
                    <p> Select Customer Information Wanted </p>
                    <FormGroup>
                        
                        <Form.Field>
                            <label>Phone Number</label>
                            <input
                                type='radio'
                                value={this.state.pnum}
                                name='pnum'
                                checked={this.state.pnum}
                                onClick={this.togglePnum} />
                        </Form.Field>
                        <Form.Field>
                            <label>Address</label>
                            <input
                                type='radio'
                                value={this.state.addr}
                                name='addr'
                                checked={this.state.addr}
                                onClick={this.toggleAddr} />
                        </Form.Field>
                        <FormField>
                            <label> Due Date: </label>
                            <input
                                type='text'
                                name='end'
                                placeholder='(YYYY-MM-DD)'
                                onChange={this.handleTextChange}
                            />
                            </FormField>
                        </FormGroup>
                        </Form>
                </Grid.Row>
            </Grid>
        )
    }
}