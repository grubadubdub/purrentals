import React, {Component} from 'react';
import { Button, Item, Icon, Label, Form, FormGroup, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'
import Axios from 'axios'
//import Routes from './../Route'

export default class EmpPosting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animals: [],
            empid: this.props.empid,
            filter: null,
        }
    }

    handleDropdownChange = (data) => {
        this.setState({ [data.name]: data.value }, async () => {
            console.log(this.state);
            // const { history } = this.props
            await Axios.post('/animal-filter', data)
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
                    <Item key={animals[i].id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {animals[i].name}
                            </Item.Header>
                            <Item.Description>
                                {animals[i].diet}
                            </Item.Description>
                            <Item.Extra>
                                <Label>{animals[i].type_of_clinic}</Label>
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

                        {/* <Item.Content>
                            <Item.Header as='a'>Mike Hawk</Item.Header>
                            <Item.Description>Is long and hard, in all seriousness, i think care package
                                deets can go here
                </Item.Description>
                            <Item.Extra>
                                <Label>Scaly</Label>
                                <NavLink to='/update-animal'>
                                    <Button primary floated='left'>
                                        Update
                        <Icon name='right chevron' />
                                    </Button>
                                </NavLink>
                                <Button primary floated='left'>
                                    Remove
                            <Icon name='right chevron' />
                                </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>Daddy</Item.Header>
                            <Item.Description>Wants a thirsty, furry little boy uwuwuwuwuwuwuwuwu</Item.Description>
                            <Item.Extra>
                                <Label>Feathery uwu</Label>
                                <Button primary floated='left'>
                                    Update
                        <Icon name='right chevron' />
                                </Button>
                                <Button primary floated='left'>
                                    Remove
                        <Icon name='right chevron' />
                                </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>BDSM</Item.Header>
                            <Item.Description>I'm into BDSM; Beautiful Dogs Surrounding Me</Item.Description>
                            <Item.Extra>
                                <Label>Furry</Label>
                                <Button primary floated='left'>
                                    Update
                        <Icon name='right chevron' />
                                </Button>
                                <Button primary floated='left'>
                                    Remove
                        <Icon name='right chevron' />
                                </Button>
                            </Item.Extra>
                        </Item.Content> */}
                  
                </Item.Group>
                {/* <Routes/> */}
            </div>
        )
    }
}
