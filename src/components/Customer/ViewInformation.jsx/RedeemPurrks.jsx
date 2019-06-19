import React, { Component } from 'react'
import { Grid, Button, Item, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export default class RedeemPurks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            purrks: [],
        }
    }

    componentDidMount() {
        fetch('/api/customers/redeem-purrks')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong on api server!');
                }
            }).catch(error => {
                console.error(error);
              });
    }

    createItem = () => {
        let purrks = this.state.purrks
        if (purrks.length > 1) {
            let items = []
            for (var i = 0, len = purrks.length; i < len; i++) {
                items.push(
                    <Item key={purrks[i].id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {purrks[i].name}
                            </Item.Header>
                            <Item.Description>
                                {purrks[i].diet}
                            </Item.Description>
                            <Item.Extra>
                                <Label>Feathery uwu</Label>
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
            <Grid>
                <Grid.Row centered>
                    {this.createItem()}
                    <Link to='/customer'>
                        <Button color='yellow'> Click here to return home </Button>
                    </Link>
                </Grid.Row>
            </Grid>
        )
    }
}