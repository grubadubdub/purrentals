import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class TEmpManagement extends Component {
    state = {
        empid: this.props.empid
    }
    render() {
        return (
            <div>
                <Button.Group basic attached='bottom'>
                    <Link to='/new-purrent'>
                        <Button>Add</Button>
                    </Link>
                    <Link to={{pathname: '/update-purrent', state: this.state.empid}}>
                        <Button>Update</Button>
                    </Link>
                    <Link to='/remove-purrent'>
                        <Button>Delete</Button>
                    </Link>

                </Button.Group>
            </div>
        )
    }
}