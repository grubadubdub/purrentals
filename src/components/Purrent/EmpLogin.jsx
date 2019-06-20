import React, { Component } from 'react';
import { Form, Button, Grid, Header } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class EmpLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { empid: '' }
    }

    getID = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    makeFetch = async (data) => {
        const { history } = this.props
        const res = await axios.post('/api/purrents/login', data);
        this.setState({ empid: res.data })
        if (res.status === 500) {
            alert("some thing is wrong, try again")
        } else
            if (res.status === 200) {
                history.push('/purrent', res.data)
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
                            <label htmlFor="empid">Enter your 3 Digit Number EmpID:</label>
                            <input type='text' name='empid' placeholder='empid' onChange={this.getID}/>
                        </Form.Field>

                        {/* <Link to={{ pathname: '/purrent', state: this.state.empid }}> */}
                            <Button onClick={()=>this.makeFetch(this.state)}> Login </Button>
                        {/* </Link> */}
                        {/* <Form success>
                <Message success header='Form Completed' content="You're all signed up!" /> */}
                    </Form>
                </Grid.Row>
            </Grid>
        );
    };
}