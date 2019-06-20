import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

class EmpCard extends Component {
    render() {
        return (
            <Card>
                <Image src='https://66.media.tumblr.com/b8e33b75c6be626ed92b174f7b73bbc5/tumblr_pn9fbhg7Ee1qdqnr9_540.jpg' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{this.props.empid}</Card.Header>
                </Card.Content>
            </Card>
        )
    }
}

export default EmpCard;