import React, {Component} from 'react';
import { Button, Item, Icon, Label, Form, FormGroup, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'
//import Routes from './../Route'

export default class EmpPosting extends Component {

    state = {
        filter: null,
    }

    handleDropdownChange = (e, data) => {
        this.setState({ [data.name]: data.value }, () => {
            console.log(this.state);
            var request = new Request('http://localhost:3000/animal-fliter', {
                method: 'POST',
                header: new Headers({ 'Content-Type': 'application/json' }),
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

    // componentDidMount() {
    //     fetch('/api/animals')
    //         .then(res => {
    //             if (res.status === 200) {
    //                 res.json().then(anims => this.setState({ animals: anims.rows }))
    //             } else {
    //                 alert('something went wrong loading animals')
    //             }
    //         })
    // }
    // createItem = () => {
    //     let animals = this.state.animals
    //     if (animals.length > 1) {
    //         let items = []
    //         for (var i = 0, len = animals.length; i < len; i++) {
    //             items.push(
    //                 <Item key={animals[i].id}>
    //                     <Item.Content>
    //                         <Item.Header as='a'>
    //                             {animals[i].name}
    //                         </Item.Header>
    //                         <Item.Description>
    //                             {animals[i].diet}
    //                         </Item.Description>
    //                         <Item.Extra>
    //                             <Label>Feathery uwu</Label>
    //                             <Button primary floated='left'>
    //                                 Update
    //                   <Icon name='right chevron' />
    //                             </Button>
    //                             <Button primary floated='left'>
    //                                 Delete
    //                   <Icon name='right chevron' />
    //                             </Button>
    //                         </Item.Extra>
    //                     </Item.Content>
    //                 </Item>)
    //         }
    //         return items
    //     }
    // };

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
                                name='filter'
                                options={this.animalOptions}
                                onChange={this.handleDropdownChange}
                            />
                        </Form.Field>
                    </FormGroup>
                </Form>
                <Item.Group divided>
                    <Item>
                        {/* {this.createItem()} */}
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
                    </Item>
                </Item.Group>
                {/* <Routes/> */}
            </div>
        )
    }
}
