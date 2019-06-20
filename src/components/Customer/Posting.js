import React, { Component } from 'react';
import { Button, Item, Label, Icon, Form, FormGroup, Dropdown } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
//import Routes from './../Route'


class Posting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animals: [],
            custid: this.props.custid,
            filter: null,
        }
    }

    handleDropdownChange = (data) => {
        this.setState({ [data.name]: data.value }, async () => {
            console.log(this.state);
            await axios.post('/api/animal-filter', data)
                .then((res) => {
                    if (res.status === 500) {
                        alert('server side error')
                    } else if (res.status === 400) {
                        alert('client side error')
                    } else if (res.status === 200) {
                        /*display filtered info*/
                    } else (
                        alert('error')
                    )
                }).catch(e => {
                    console.log(e)
                })
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

    componentDidMount() {
        fetch('/api/animals')
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
                    <Item key={animals[i].animalid}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {animals[i].name}
                            </Item.Header>
                            <Item.Description>
                                {animals[i].diet}
                            </Item.Description>
                            <Item.Extra>
                                <Label>{animals[i].type_of_clinic}</Label>
                                <Button primary floated='left'>
                                    Rent
                      <Icon name='right chevron' />
                                </Button>
                                <Button primary floated='left'>
                                    Buy
                      <Icon name='right chevron' />
                                </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>)
            }
            return items
        }
    };

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
                    {this.createItem()}
                </Item.Group>
            </div>
        );
    }
}
export default Posting;