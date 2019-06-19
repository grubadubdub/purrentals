import React, { Component } from 'react';
import { Button, Item, Label, Icon, Form, FormGroup, Dropdown } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom'
//import Routes from './../Route'


class Posting extends Component {
    state = { 
        custid: this.props.custid,
        filter: null,
             }

    handleDropdownChange = (e, data) => {
        this.setState({ [data.name]: data.value }, () => {
                console.log(this.state);
                var request = new Request('http://localhost:3000/animal-filter', {
                    method: 'POST',
                    header: new Headers( { 'Content-Type': 'application/json'}),
                    body: JSON.stringify(this.state)
                });
                fetch(request)
                .then(response => {
                  if (response.status === 200) {
                    return response.json();
                  } else {
                    throw new Error('Something went wrong on api server!');
                  }
                }).catch(error => {
                    console.error(error);
                  });
                
                })

    }
    animalOptions = [
        {
            key: 'Furry',
            text: 'Furry',
            value: 'furry'
        },
        {
            key: 'Feathery',
            text: 'Feathery',
            value: 'feathery'
        },
        {
            key: 'Scaly',
            text: 'Scaly',
            value: 'scaly'
        }
    ]

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <label> Filter by animal type </label>
                        <Form.Field>
                            <Dropdown
                                type='text'
                                placeholder='Select type of animal'
                                name='animaltype'
                                options={this.animalOptions}
                                onChange={this.handleDropdownChange}
                            />
                        </Form.Field>
                    </FormGroup>
                </Form>
                <Item.Group divided>
                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>Mike Hawk</Item.Header>
                            <Item.Description>Is long and hard, in all seriousness, i think care package
                                deets can go here
                </Item.Description>
                            <Item.Extra>
                                <Label>Scaly</Label>
                                <NavLink to={{ pathname: '/new-rental', state: this.state.custid }}>
                                    <Button primary floated='left'> Rent <Icon name='right chevron' /></Button>
                                </NavLink>
                                <NavLink to={{ pathname: '/new-purrchase', state: this.state.custid }}>
                                    <Button primary floated='left'> Buy <Icon name='right chevron' /></Button>
                                </NavLink>
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>Daddy</Item.Header>
                            <Item.Description>Wants a thirsty, furry little boy uwuwuwuwuwuwuwuwu</Item.Description>
                            <Item.Extra>
                                <Label>Feathery uwu</Label>
                                <Button primary floated='left'> Rent </Button>
                                <Button primary floated='left'> Buy </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>BDSM</Item.Header>
                            <Item.Description>I'm into BDSM; Beautiful Dogs Surrounding Me</Item.Description>
                            <Item.Extra>
                                <Label>Furry</Label>
                                <Link to='/customer-rental'>
                                    <Button primary floated='left'>
                                        Rent
                    </Button>
                                </Link>
                                <Button primary floated='left'>
                                    Buy
                    </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
                {/* <Routes/> */}
            </div>
        );
    }
}
export default Posting;