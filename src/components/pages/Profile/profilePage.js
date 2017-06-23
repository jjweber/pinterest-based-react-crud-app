import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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
        <h1>Hello <span>username</span></h1>
        <img src={'/src/images/profile-placeholder-image.jpeg'} />
        <Form>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input type="text" name="text" id="firstName" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input type="text" name="text" id="lastName" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="userName">Username</Label>
            <Input type="text" name="text" id="userName" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="userEmail">Email</Label>
            <Input type="email" name="email" id="userEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="userUrl">Url</Label>
            <Input type="url" name="url" id="userUrl" placeholder="url placeholder" />
          </FormGroup>
          <FormGroup  tag="fieldset" row>
          <legend className="col-form-legend col-sm-2">Gender</legend>
          <Col sm={10}>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio2" />{' '}
                Male
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio2" />{' '}
                Female
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        </Form>
      </div>
    );
  }

}

export default Profilepage;
