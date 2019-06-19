import React, { Component } from 'react';
import Posting from './Posting';
import AccountGrid from '../AccountGrid';
import Statistics from '../Statistics';

import { Tab } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import TAnimalInfo from './HomeTabs/TAnimalInfo';

class CustomerView extends Component {
    // panes = [
    //     {
    //     menuItem: 'Animals',
    //         pane: {
    //             key: 'animals',
    //             content: ( 
    //             <div><Posting /></div>
    //             ),
    //         },
    //     },
    //     { 
    //     menuItem: 'My Account', 
    //         pane: {
    //             key: 'account', 
    //             content: (
    //             <div><AccountGrid /></div>
    //             ),
    //         },
    //     },
    //     {
    //     menuItem: 'Statistics',
    //         pane: {
    //             key: 'stats',
    //             content: (
    //                 <div><Statistics /></div>
    //             ),
    //         },
    //     },
    // ]
    state = { custid: this.props.location.state }

    render() {

        return (
            <Tab
                menu={{ fluid: true, vertical: true, tabular: true }}
                panes={[
                    {
                        menuItem: 'Browse Animals',
                        pane: {
                            key: 'animals',
                            content: (
                                <div><Posting custid={this.state.custid}/></div>
                            ),
                        },
                    },
                    {
                        menuItem: 'Browse Animal Information',
                        pane: {
                            key: 'animalinfo',
                            content: (
                                <div><TAnimalInfo custid={this.state.custid} /></div>
                            ),
                        },
                    },
                    {
                        menuItem: 'My Account',
                        pane: {
                            key: 'account',
                            content: (
                                <div><AccountGrid custid={this.state.custid} /></div>
                            ),
                        },
                    },
                    {
                        menuItem: 'Statistics',
                        pane: {
                            key: 'stats',
                            content: (
                                <div><Statistics /></div>
                            ),
                        },
                    },
                ]}
                renderActiveOnly={false} />);
    }
}
export default CustomerView;