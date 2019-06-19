import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default class TCustManagement extends Component {
    makeFetch(data) {
        console.log(data);
        var request = new Request('http://localhost:3000/delete-cust', {
            method: 'DELETE',
            header: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });
        fetch(request)
            .then(response => {
                if (response.status === 200) {
                    console.log(response)
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            }).catch(error => {
                console.error(error);
            });

    }
    render() {
        return (

            <div><Button.Group attached='bottom'>
                <NavLink to='/add-customer'>
                    <Button fluid>Add</Button>
                </NavLink>
                <NavLink to='/remove-customer'>
                    <Button fluid onClick={ console.log('hi')
                        // () => this.makeFetch(this buttons associated customer id)
                        }>Remove</Button>
                </NavLink>
            </Button.Group>
            </div>
        )
    }
}