import React, { Component } from 'react'
import { Button, Item, Label, } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default class TCustManagement extends Component {
    state = {
        animals: [],
        empid: this.props.empid,
        filter: null,
    }
    componentDidMount() {
        fetch('/api/customers')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(anims => this.setState({ animals: anims.rows }))
                } else {
                    alert('something went wrong loading animals')
                }
            })
    }    
    createItem = () => {
        let animals = this.state.animals
        if (animals.length > 1) {
            let items = []
            for (var i = 0, len = animals.length; i < len; i++) {
                items.push(
                    <Item key={animals[i].custid}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {animals[i].name}
                            </Item.Header>
                            <Item.Description>
                                {animals[i].address}
                            </Item.Description>
                            <Item.Description>
                                {animals[i].custid}
                            </Item.Description>
                            <Item.Extra>
                                <Label>Phone: {animals[i].phone_number}</Label>
                        </Item.Extra>
                        {/* <Item.Content>
                            {animals[i].}
                        </Item.Content> */}
                        </Item.Content>
                    </Item>)
            }
            return items
        }
    };
    render() {
        return (
            <div>
            <Item.Group divided>
            {this.createItem()}
            </Item.Group>
            <div>
                <Button.Group attached='bottom'>
                <NavLink to='/add-customer'>
                    <Button fluid>Add</Button>
                </NavLink>
                <NavLink to='/remove-customer'>
                    <Button >Remove</Button>
                </NavLink>
            </Button.Group>
            </div>
            </div>
        )
        
    }
}