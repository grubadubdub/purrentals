import React, { Component } from 'react';
import EmpCard from './EmpCard';
import { Link } from 'react-router-dom';
import { Grid, Item, Button, Label, Icon, Divider, } from 'semantic-ui-react';

class EmpAccount extends Component {
    state = { 
        empid: this.props.empid,
        salary: 100,
    }

    render() {
        return (
            <Grid columns={2} divided>
                <Grid.Row stretched>

                    <Grid.Column>
                        <EmpCard empid={this.state.empid} />

                    <Link to={{pathname: 'update-purrent', state: this.state.empid}}>
                            <Button size='medium'>
                                Update Info
                            </Button>
                        </Link>
                    </Grid.Column>

                    <Grid.Column>
                        <h2>Salary</h2>
                        {this.state.salary}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default EmpAccount;