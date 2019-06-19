import React, { Component } from 'react'
import {Button} from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom'
import EmpPosting from '../EmpPosting';

export default class TAnimalManagement extends Component {
    render() {
        return (
            <div>
                    <EmpPosting />
                    <Button.Group attached='bottom'>
                        <Link to='/new-animal'>
                            <Button color='pink'>Add New Animal</Button>
                        </Link>
                        <NavLink to='/update-animal'>            
                        <Button color='violet'>
                        Update an Animal
                        </Button>
                    </NavLink>
                    </Button.Group>
                </div>
        )
    }
}