import React, {Component} from 'react';
import { Grid, Card, Segment, Header, Icon, Divider } from 'semantic-ui-react';

class Statistics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bestseller: null,
            worstseller: null,
            ytd: null,
            bestperformer: null,
        }
    }
  
    componentDidMount() {
        fetch('/api/best_seller')
        .then(res => {
            if (res.status === 200) {
                res.json().then(bestseller => this.setState({ bestseller: bestseller }))
            } else {
                // alert('something went wrong loading statistic')
            }
        })
        fetch('/api/ytd_sales')
        .then(res => {
            if (res.status === 200) {
                res.json().then(ytdsales => this.setState({ ytd: ytdsales[0].sum }))
            } else {
                // alert('something went wrong loading statistics')
            }
        })
        fetch('/api/fungeon_top')
        .then(res => {
            if (res.status === 200) {
                res.json().then(topfungeon => this.setState({ topfungeon: topfungeon }))
            } else {
                // alert('something went wrong loading statistics')
            }
        })
}
    state = {
        // Best Boi
        BestSellerName: undefined,
        BestSellerType: undefined,
        BestSellerFungeon: undefined,
        BestSellerRentalCount: undefined,

        // Worst Boi
        WorstSellerName: undefined,
        WorstSellerType: undefined,
        WorstSellerFungeon: undefined,
        WorstSellerRentalCount: undefined,

        // Due Dates
        DueDates: [],

        // Customer w most transactions
        BestBuyName: undefined,
        BestBuy_Points: undefined,
        BestBuy_Trans_Count: undefined,

        // Fungeon w most transactions
        Bestgeon_Name: undefined,
        Bestgeon_Type: undefined,
        Bestgeon_Fungeon: undefined
    }

    // Multiple fetch calls to get pertinent data
    // componentDidMount() {
    //     // fetch best boi
    //     fetch('/bestseller')
    //         .then(res => res.json())
    //         .then(bestseller => this.setState({ animals: bestseller.rows }))
        
    //     // fetch least bought animal
    //     fetch('/worst_seller')
    //         .then(res => res.json())
    //         .then(worstseller => this.setState({ animals: worstseller.rows }))

    //     // fetch YTD sales
    //     fetch('/ytd_sales')
    //         .then(res => res.json())
    //         .then(ytd => this.setState({ animals: ytd.rows }))

    //     // fetch all curr due dates
    //     fetch('/duedates')
    //         .then(res => res.json())
    //         .then(duedates => this.setState({ DueDates: duedates.rows }))

    //     // fetch cust w highest transactions
    //     fetch('/highest_bidder')
    //         .then(res => res.json())
    //         .then(highestbidder => this.setState({ animals: highestbidder.rows }))

    //     // fetch Fungeon w most transactions/revenue
    //     fetch('/best_fungeon')
    //         .then(res => res.json())
    //         .then(bestfungeon => this.setState({ animals: bestfungeon.rows }))
    // }

    

    // Create card for summary view
    createCard = (name, attr1, attr2, attr3) => {
        let card = (
        <Card>
            <Card.Content header={name} />
            <Card.Content>
                <Card.Meta><span>{attr1}</span></Card.Meta>
                <Card.Meta><span>{attr2}</span></Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
                {attr3}
                </Card.Content>
        </Card>)

        return card;
    }

    getTop5DueDates = () => {
        let dues = this.state.DueDates;
        let dates = [];

        for(let i=0; i <= 5; i++) {
            //dates.push(this.createCard(dues[i].name, dues[i].fungeon, dues[i].duedate, dues[i].customer));
        }

        return dates;
    }

    render() {
        console.log(this.state)
        return(
            <Grid columns={3} divided>
                <Grid.Row stretched>

                    <Grid.Column>
                        <h3>Best Boi</h3> <Divider />
                        {this.createCard('Piece of Shit', 'Furry', 'Sux cock', '69 rentals')}

                        <h3>Needs to be bought more Boi</h3> <Divider />
                        {this.createCard('Mike Litoris', 'Feathery', 'Moist', '69 pounds')}
                    </Grid.Column>

                    <Grid.Column>
                        <h3>Upcoming Due Dates</h3> <Divider />
                        <Card.Group>
                            {this.createCard('Ho Li Fuk', 'From Fungeon x', 'Due by', 'Rented by')}
                            {this.createCard('Kyons Dildo', 'From fungeon y', 'Due by', 'Who rented me')}
                            {this.createCard('Gag Ball', 'From my sex dungeon', 'Due by', 'Who rented this shit')}
                        </Card.Group>   
                    </Grid.Column>

                    <Grid.Column>
                        <div>
                        <Segment circular inverted color='olive' style={{width: 175, height: 175}}>
                            <Header as='h2' inverted>
                                YTD Sales
                                <Header.Subheader>$100000</Header.Subheader>
                            </Header>
                        </Segment>
                        </div>

                        <h3>Greatest Sale</h3> <Divider />
                        {this.createCard('Gaylord Focker', 'Amt of sale', 'Fungeon', 'idk what to put here')}

                        <h3>Highest Sales Fungeon</h3> <Divider />
                        {this.createCard('Sum Ting Wong', 'From Fungeon x', 'Due by', 'Rented by')}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    };
}

export default Statistics;