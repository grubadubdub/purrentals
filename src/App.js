import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './components/Home';

import CustomerView from "./components/Customer/CustomerView";
import PurrentView from './components/Purrent/PurrentView';
import Login from './components/Customer/Login';
import NewPurchase from './components/Customer/Transaction/NewPurchase';
import viewInvoices from './components/Customer/ViewInformation.jsx/viewInvoices';
import CustUpdate from './components/Customer/AccManagement/CustUpdate';
import CustSignUp from './components/Customer/AccManagement/CustSignUp';
import RedeemPurks from './components/Customer/ViewInformation.jsx/RedeemPurrks';

import EmpLogin from './components/Purrent/EmpLogin';
import AddAnimal from './components/Purrent/AnimalManagement/AddAnimal';
import UpdateAnimal from './components/Purrent/AnimalManagement/UpdateAnimal';
import AddEmp from './components/Purrent/EmpManagement/AddEmp';
import UpdateEmp from './components/Purrent/EmpManagement/UpdateEmp';
import DeleteEmp from './components/Purrent/EmpManagement/DeleteEmp';
import DeleteCust from './components/Purrent/CustManagement/DeleteCust';
import ThankYou from './components/Customer/Transaction/ThankYou';
import AddCust from './components/Purrent/CustManagement/AddCust';
import Statistics from './components/Statistics';
import NewRental from './components/Customer/Transaction/newRental';
import TAnimalInfo from './components/Customer/HomeTabs/TAnimalInfo';
import ViewTrans from './components/Customer/ViewInformation.jsx/ViewTrans';


class ui_test extends Component {
	render() {
		return(	
			<BrowserRouter>
				<div>
					<Route path="/" component={Home} exact />
					<Route path="/customer" component={CustomerView} exact />					
					<Route path='/customer-login' component={Login} />
					<Route path="/customer-signup" component={CustSignUp}/>
					<Route path='/customer-invoices' component={viewInvoices}/>
					<Route path='/customer-update' component={CustUpdate} />
					<Route path='/customer-redeempurrks' component={RedeemPurks}/>
					<Route path='/customer-thank-you' component={ThankYou}/>
					<Route path='/customer-transactions' component={ViewTrans}/>

					{/* PURRENT PAGES */}

					<Route path="/purrent" component={PurrentView} exact />
					<Route path='/purrent-login' component={EmpLogin} />
					<Route path='/new-purrent' component={AddEmp}/>
					<Route path='/update-purrent' component={UpdateEmp}/>
					<Route path='/remove-purrent' component={DeleteEmp}/>
					<Route path='/add-customer' component={AddCust}/>
					<Route path='/remove-customer' component={DeleteCust}/>

					<Route path='/new-animal' component={AddAnimal}/>
					<Route path='/update-animal' component={UpdateAnimal}/>

					<Route path='/new-rental' component={NewRental} />
					<Route path='/new-purrchase' component={NewPurchase} />
					<Route path='/statistics' component={Statistics} />
				</div>
			</BrowserRouter>
		);
	}
}

export default ui_test;
