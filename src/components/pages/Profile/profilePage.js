import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import * as firebase from 'firebase';

class Profilepage extends Component {
  constructor(props) {
      super(props);

      this.state = {
        speed: 10,

        firstName: '',
        lastName: '',
        userName: '',
        userEmail: ''

      };
/*
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleUserNameChange = this.handleUserNameChange.bind(this);
      this.handleUserEmailChange = this.handleUserEmailChange.bind(this);
*/
  }

  handleNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleAmountChange(event) {
        this.setState({lastName: event.target.value});
    }

    handleCategoryChange(event) {
        this.setState({userName: event.target.value});
    }

    handleCategoryChange(event) {
        this.setState({userEmail: event.target.value});
    }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react');
    // Reference out to specific location
    const speedRef = rootRef.child('speed');
    // Realtime listener
    speedRef.on('value', snap => {
      // New Data
      this.setState({
        speed: snap.val()
      });
    });
  }

  render() {
    return (

      <div id="profileContainer">
        <h1>{this.state.speed}</h1>

        <h1>Hello <span>username</span></h1>
        <img src={'/src/images/profile-placeholder-image.jpeg'} />
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Static</Label>
            <Input static>Some static value</Input>
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input type="text" name="text" id="firstName" placeholder="with a placeholder" onChange={this.handleFirstNameChange} value={this.state.firstName} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input type="text" name="text" id="lastName" placeholder="with a placeholder" onChange={this.handleLastNameChange} value={this.state.lastName} />
          </FormGroup>
          <FormGroup>
            <Label for="userName">Username</Label>
            <Input type="text" name="text" id="userName" placeholder="with a placeholder" onChange={this.handleUserNameChange} value={this.state.userName} />
          </FormGroup>
          <FormGroup>
            <Label for="userEmail">Email</Label>
            <Input type="email" name="email" id="userEmail" placeholder="with a placeholder" onChange={this.handleUserEmailChange} value={this.state.userEmail} />
          </FormGroup>
          <FormGroup>
            <Label for="userPassword">Password</Label>
            <Input type="password" name="password" id="userPassword" placeholder="password placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="userUrl">Url</Label>
            <Input type="url" name="url" id="userUrl" placeholder="url placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="userNumber">Number</Label>
            <Input type="number" name="number" id="userNumber" placeholder="number placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="userColor">Color</Label>
            <Input type="color" name="color" id="userColor" placeholder="color placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="userSearch">Search</Label>
            <Input type="search" name="search" id="userSearch" placeholder="search placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="userSelect">Select</Label>
            <Input type="select" name="select" id="userSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="userText">Text Area</Label>
            <Input type="textarea" name="text" id="userText" />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" />{' '} Male
            </Label>
            <Label check>
              <Input type="radio" />{' '} Female
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Check me out
            </Label>
          </FormGroup>
        </Form>
      </div>
    );
  }

}

export default Profilepage;
