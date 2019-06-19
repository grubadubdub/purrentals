import React from 'react';
import {Route, Switch} from 'react-router-dom'
import NewRental from './components/Customer/Transaction/newRental';
// import AccountGrid from './components/Customer/AccountGrid';
// import Sidebar from './components/Customer/Sidebar';
// import { Home, Customer, Purrent } from './component'
// import { About } from './component/About'.

const Routes = () => (
 <Switch>
        {/* <Route exact path='/' component={Sidebar}/> */}
        <Route path='/make-rental' component={NewRental}/>
        {/* <Route path='/purrent' component={Purrent}/> */}
</Switch>
);

export default Routes