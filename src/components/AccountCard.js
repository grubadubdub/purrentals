import React, {Component} from 'react';
import { Card, Image } from 'semantic-ui-react';

class AccountCard extends Component {
render(){
    return(
        <Card>
            <Image src='http://dcsir.org/wp-content/uploads/2017/12/Screen-Shot-2017-12-16-at-7.43.20.png' wrapped ui={false} />
            <Card.Content>
            <Card.Header>{this.props.custid}</Card.Header>
            </Card.Content>
        </Card>
        )
    }
}

export default AccountCard;