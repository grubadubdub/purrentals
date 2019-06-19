import React from 'react';
import {NavLink} from 'react-router-dom';

import {Segment, Grid, Divider, Icon, Header, Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

const Home = () => {
    return(
        <div>
            <h1 align='center'>What type of user are you?</h1>
            <Segment placeholder>
				<Grid columns={2} stackable textAlign='center'>
					<Divider vertical>Or</Divider>

					<Grid.Row verticalAlign='middle'>
						<Grid.Column>
							<Header icon>
								<Icon name='shop' />
							</Header>

							<NavLink to='/customer-login'>
                                <Button primary> Customer </Button>
                            </NavLink>
							<Divider>
							</Divider>
							<NavLink to='/customer-signup'>
								<Button color='pink'> Click here to Sign Up</Button>
							</NavLink>
						</Grid.Column>

						<Grid.Column>
							<Header icon>
								<Icon name='world' />
							</Header>

                            <NavLink to='/purrent-login'>
							    <Button primary>Purrent</Button>
                            </NavLink>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
        </div>
    );
};

export default Home;