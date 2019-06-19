import React, { Component } from 'react'
import { Button, Form, Grid, Header, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const animalOptions = [
    {
        key: 'Furry',
        text: 'Furry',
        value: 'furry'
    },
    {
        key: 'Feathery',
        text: 'Feathery',
        value: 'feathery'
    },
    {
        key: 'Scaly',
        text: 'Scaly',
        value: 'scaly'
    }       
]

const dietOptions = [
    {
        key: 'vegan',
        text: 'Vegan',
        value: 'vegan'
    },
    {
        key: 'paleo',
        text: 'Paleo',
        value: 'paleo'
    },
    {
        key: 'meat',
        text: 'Meat Only',
        value: 'meat'
    },
    {
        key: 'glutenfree',
        text: 'Gluten-Free',
        value: 'glutenfree'
    },
    {
        key: 'vegetarian',
        text: 'Vegetarian',
        value: 'veg'
    }
]

const blidOptions = [
    { key: 69, value: 69, text: 69 },
    { key: 70, value: 70, text: 70 },
    { key: 71, value: 71, text: 71 },
    { key: 72, value: 72, text: 72 },
    { key: 73, value: 73, text: 73 },
]


export default class UpdateAnimal extends Component {
    state = {
        animalid: null,
        animaltype: null,
        diet: null,
        blid: null,
        clinid: null,
        packageid: null,
    }
    
    makeFetch(data) {
        console.log(data);
        var request = new Request('http://localhost:3000/update-animal', {
            method: 'POST',
            header: new Headers( { 'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        });
        fetch(request)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Something went wrong on api server!');
          }
        }).catch(error => {
            console.error(error);
          });
        
    }
    handleTextChange = e => {
        this.setState({[e.target.name]: e.target.value}, console.log(this.state))      
    }
    handleDropdownChange = (e, data) => {
        this.setState({[data.name] : data.value }, console.log(this.state))
    }
    render() {
        const { value } = this.state
        return (
    <Grid>
        <Grid.Row centered>
            <Header/>
            <Form>
                <Form.Field>
                    <label htmlFor='animalid'>Enter a 3 Digit AnimalID:</label>
                    <input 
                        type='text' 
                        placeholder='Animal ID' 
                        name='animalid' 
                        onChange={this.handleTextChange}/>
                </Form.Field>
                <Form.Field>
                    <label htmlFor='animaltype'>Type of Animal:</label>
                    <Dropdown 
                        type='text' 
                        placeholder='Select type of animal'
                        name='animaltype'
                        options={animalOptions}
                        onChange={this.handleDropdownChange}
                        />
                  </Form.Field>
                  <Form.Field>
                     <label htmlFor='diet'> Diet:</label>
                     <Dropdown 
                        type='string' 
                        placeholder='Select type of diet' 
                        options={dietOptions} 
                        name='diet'
                        onChange={this.handleDropdownChange}/>
                  </Form.Field>
                    <Form.Field>
                        <label>Home Fungeon: (options should be queried from db)</label>
                        <Dropdown 
                            placeholder='Select a fungeon location' 
                            options={blidOptions} 
                            name='blid'
                            onChange={this.handleDropdownChange}/>
                    </Form.Field>
                   <Form.Field>
                       <label>Clinic: (options should be queried from db)</label>
                       <Dropdown placeholder='Select a clinic' options={null} name='clinid'/>
                   </Form.Field>
                   <Form.Field>
                       <label>Care Package: (options should be queried from db)</label>
                       <Dropdown placeholder='Select a care package' options={null} name='packageid'/>
                   </Form.Field>
                   <Link to='/purrent'>
                   <Button color='orange' onClick={() => { 
                       this.makeFetch(this.state)
                   }}> Update </Button>
                   </Link>
            </Form>
        </Grid.Row>
    </Grid>
        );
    };

}