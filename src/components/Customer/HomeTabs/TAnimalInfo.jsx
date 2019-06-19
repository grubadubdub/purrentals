import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Input, Form, Label, Button, Radio, FormGroup, Table, Icon, Menu, Header } from 'semantic-ui-react';
import { BrowserRouter, Link } from "react-router-dom";

export default class TAnimalInfo extends Component {
    state = {
        package: false,
        diet: false,
        animaltype: false,
    }

    makeFetch = async (data) => {
        await axios.post('/api/customers/misc-animal-info')
            .then(res => {
                if (res.status === 200) {
                    /*do something wih response.json()*/
                    // console.log(response)
                    // return response.json();
                } if (res.status === 500) {
                    alert('server side error')
                } else if (res.status === 400) {
                    alert('client side error')
                }
            }).catch(error => {
                console.error(error);
            });

    }
    togglePackage = (e) => {
        console.log(this.state)
        this.setState(prevState => ({ package: !prevState.package }))
    }
    toggleDiet = (e) => {
        console.log(this.state)
        this.setState(prevState => ({ diet: !prevState.diet }))
    }
    toggleAnimal = (e) => {
        console.log(this.state)
        this.setState(prevState => ({ animaltype: !prevState.animaltype }))
    }

    render() {
        return (
            <Grid
            </Grid>
        );
    };

}