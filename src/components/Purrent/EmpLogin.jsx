import React, { Component } from 'react';
import { Form, Button, Grid, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default class EmpLogin extends Component {
    state = { empid: 'EmpID' }

    getID = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    saveCustomer = (input) => {
        this.setState({empid: input});

        console.log(this.state);

        // Send req to server
        var request = new Request('https://localhost:3000/api/purrent/emp-login', {
            method: 'POST',
            header: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(input),
        });

        try {
            fetch(request).then(response => {
                response.json();
            });
        } catch {throw new Error("Could not find custid");}
    };

    render() {
        const { value } = this.state.empid;

        return (
            <Grid>
                <Header>

                </Header>
                <Grid.Row centered>
                    <Form>
                        <Form.Field>
                            <label htmlFor="empid">Enter your 3 Digit Number EmpID:</label>
                            <input type='text' name='empid' placeholder='empid' onChange={this.getID}/>
                        </Form.Field>

                        <Link to={{ pathname: '/purrent', state: this.state.empid }}>
                            <Button onClick={()=>this.saveCustomer(value)}> Login </Button>
                        </Link>
                        {/* <Form success>
                <Message success header='Form Completed' content="You're all signed up!" /> */}
                    </Form>
                </Grid.Row>
            </Grid>
        );
    };
}