import React, { Component } from 'react'
import axios from 'axios'
import { Grid, Input, Form, Label, Button, Radio, FormGroup, Table, Icon, Menu, Header } from 'semantic-ui-react';
import { BrowserRouter, Link } from "react-router-dom";

export default class TAnimalInfo extends Component {
    state = {
        package: false,
        diet: false,
        animaltype: false
    }

    makeFetch = async (data) => {
        await axios.post('/api/customers/misc-animal-info', data)
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

    // createTuple = () => {
    //     let rows = 
    // }

    render() {
        return (
            <Grid>
                <Grid.Row centered>
                    <Header> Browse Misc Animal Information! </Header>
                    <Form>
                        <FormGroup>
                            <Form.Field>
                                <label>Care Package Collection</label>
                                <input
                                    type='radio'
                                    value={this.state.package}
                                    name='package'
                                    checked={this.state.package}
                                    onClick={this.togglePackage} />
                            </Form.Field>
                            <Form.Field>
                                <label>Diet Types</label>
                                <input
                                    type='radio'
                                    value={this.state.diet}
                                    name='diet'
                                    checked={this.state.diet}
                                    onClick={this.toggleDiet} />
                            </Form.Field>
                            <Form.Field>
                                <label>Animal Varieties</label>
                                <input
                                    type='radio'
                                    value={this.state.animaltype}
                                    name='animaltype'
                                    checked={this.state.animaltype}
                                    onClick={this.toggleAnimal} />
                            </Form.Field>
                        </FormGroup>
                        <Button color='olive' onClick={() => this.makeFetch(this.state)}> Project Info Selected </Button>
                    </Form>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Care Package</Table.HeaderCell>
                                <Table.HeaderCell> Diets </Table.HeaderCell>
                                <Table.HeaderCell>Animal Types</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    1
                                </Table.Cell>
                                <Table.Cell>paleo</Table.Cell>
                                <Table.Cell>furry</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>3</Table.Cell>
                                <Table.Cell>vegan</Table.Cell>
                                <Table.Cell>feathery</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell></Table.Cell>
                                <Table.Cell>meat only</Table.Cell>
                                <Table.Cell>scaly</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid>
        );
    };

}