import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

class EmpCard extends Component {
    state = {
        name: 'Shibal Inu',
        type: 'Manager',
        fungeon: 'UpUrAss'
    }

    componentDidMount() {
        var request = new Request('https://localhost:3000/api/purrent/curr-purrent', {
            method: 'POST',
            header: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(this.props),
        });

        fetch(request)
            .then(res => res.json())
            .then(employee => this.setState({ 
                name: employee.rows.name, 
                type: employee.rows.type,
                fungeon: employee.rows.fungeon
            }))
    }

    render() {
        return (
            <Card>
                <Image src='https://66.media.tumblr.com/b8e33b75c6be626ed92b174f7b73bbc5/tumblr_pn9fbhg7Ee1qdqnr9_540.jpg' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{this.state.name}</Card.Header>
                    <Card.Meta>
                        <span>{this.state.type}</span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    {this.state.fungeon}
            </Card.Content>
            </Card>
        )
    }
}

export default EmpCard;