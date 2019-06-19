import React, { Component } from 'react'
import { Item, Header } from 'semantic-ui-react';


export default class ViewTrans extends Component {

    state = {
        custid: this.props.location.state,
        transactions: [],
    }

    componentDidMount() {
        fetch('/customer-transactions', this.state.custid)
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
        // let animals = this.state.animals
        // if (animals.length > 1) {
        //     let items = []
        //     for (var i = 0, len = animals.length; i < len; i++) {
        //         items.push(
        //             <Item key={animals[i].id}>
        //                 <Item.Content>
        //                     <Item.Header as='a'>
        //                         {animals[i].name}
        //                     </Item.Header>
        //                     <Item.Description>
        //                         {animals[i].diet}
        //                     </Item.Description>
        //                     <Item.Extra>
        //                         <Label>Feathery uwu</Label>
        //                         <Button primary floated='left'>
        //                             Rent
        //               <Icon name='right chevron' />
        //                         </Button>
        //                         <Button primary floated='left'>
        //                             Buy
        //               <Icon name='right chevron' />
        //                         </Button>
        //                     </Item.Extra>
        //                 </Item.Content>
        //             </Item>)
        //     }
        //     return items
    }

    render() {
        return (
            <div>
                <Header>display all transactions for dis customer</Header>
                <h1>{this.state.custid}</h1>
            </div>
        )
    }
}