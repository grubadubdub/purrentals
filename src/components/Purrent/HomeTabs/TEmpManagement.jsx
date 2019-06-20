import React, { Component } from 'react'
import { Button, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class TEmpManagement extends Component {
    state = {
        animals: [],
        empid: this.props.empid,
        filter: null,
    }
    componentDidMount() {
        fetch('/api/purrents')
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
                    <Item key={animals[i].id}>
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
            {/* </Button.Group> */}
            </div>
            // </div>
        )
        
    }
   
}