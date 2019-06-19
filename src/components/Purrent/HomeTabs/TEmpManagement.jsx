import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class TEmpManagement extends Component {
    render() {
        return (
            <div>
                <Button.Group basic attached='bottom'>
                    <Link to='/new-purrent'>
                        <Button>Add</Button>
                    </Link>
                    <Link to='/update-purrent'>
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