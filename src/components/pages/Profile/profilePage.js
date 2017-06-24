import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';

class Profilepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      userName: "",
      userEmail: "",
      value: ''
    };

    this.toggle = this.toggle.bind(this);
    //this.updateUserName = this.updateUserName.bind(this);
    //this.updateUserEmail = this.updateUserEmail.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  openModal() {
      this.setState({ isModalOpen: true });
  }

  closeModal() {
      this.setState({ isModalOpen: false });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div id="profileContainer">
      <h1>Hello <span>username</span></h1>
      <Button id="setting-edit" color="danger" size="lg" onClick={this.toggle}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>Edit{this.props.buttonLabel}</Button>

      <ul id="settingsList">
        <li>Username:</li>
        <li>Email:</li>
      </ul>


      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="userName">Username</Label>
              <Input type="text" name="text" id="userName" placeholder="with a placeholder" value={this.state.value} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="userEmail">Email</Label>
              <Input type="email" name="email" id="userEmail" placeholder="with a placeholder" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.saveUser}>Save</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    );
  }
}

export default Profilepage;
