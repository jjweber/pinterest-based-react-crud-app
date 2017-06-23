import React, { Component } from 'react';

import Card from './Card';
import Modal from '../modal';

import { Container, Row, Col, Button, InputGroup, Input } from 'reactstrap';

class Explorepage extends Component {
  constructor(props) {
      super(props);

      let boardData = JSON.parse(localStorage.getItem('boardData'));
      if(!boardData) boardData = [];

      console.log("Current Boards: ", boardData);

      let initialBoardToShow = {};
      initialBoardToShow.pins = [];

      if(boardData.length) initialBoardToShow = boardData[0];

      console.log("Current Board To Show: ", initialBoardToShow);

      this.state = {
        existingBoards: boardData,
        isModalOpen: false,
        isCreateModalOpen: false,
        isEditModalOpen: false,
        isEditPinModalOpen: false,
        newBoardName: "",
        editedBoardName: "",
        editedPinDescription: "",
        currentBoardToShow: initialBoardToShow,
        boardDetailsPins: {},
        currentBoardBeingEditing: {},
        currentPinBeingEditing: {}
      };

      this.showBoardDetails = this.showBoardDetails.bind(this);
      this.deleteBoard = this.deleteBoard.bind(this);
      this.editBoard = this.editBoard.bind(this);

      this.openEditPinModal = this.openEditPinModal.bind(this);
      this.closeEditPinModal = this.closeEditPinModal.bind(this);

      this.openEditModal = this.openEditModal.bind(this);
      this.closeEditModal = this.closeEditModal.bind(this);
      this.openCreateModal = this.openCreateModal.bind(this);
      this.closeCreateModal = this.closeCreateModal.bind(this);

      this.updateNewBoardName = this.updateNewBoardName.bind(this);
      this.updateEditedBoardName = this.updateEditedBoardName.bind(this);
      this.updateEditedPinDescription = this.updateEditedPinDescription.bind(this);

      this.saveNewBoard = this.saveNewBoard.bind(this);
      this.saveEditedBoardName = this.saveEditedBoardName.bind(this);
      this.saveEditedPinDescription = this.saveEditedPinDescription.bind(this);
  }

  updateNewBoardName(e) {
    this.setState({ newBoardName: e.target.value });
  }

  updateEditedBoardName(e) {
    this.setState({ editedBoardName: e.target.value });
  }

  updateEditedPinDescription(e) {
    this.setState({ editedPinDescription: e.target.value });
  }

  saveNewBoard() {
    // add to existingBoards and update the storage
    let newBoard = {};
    newBoard.id = this.state.existingBoards.length;
    newBoard.name = this.state.newBoardName;
    newBoard.pins = [];

    this.state.existingBoards.push(newBoard);
    this.updateBoardsInStorage();

    this.closeCreateModal();
  }

  openEditPinModal() {
    this.setState({ isEditPinModalOpen: true });
  }

  closeEditPinModal() {
    this.setState({ isEditPinModalOpen: false });
  }

  openEditModal() {
    this.setState({ isEditModalOpen: true });
  }

  closeEditModal() {
    this.setState({ isEditModalOpen: false });
  }

  openCreateModal() {
    this.setState({ isCreateModalOpen: true });
  }

  closeCreateModal() {
    this.setState({ isCreateModalOpen: false });
  }

  openModal() {
      this.setState({ isModalOpen: true });
  }

  closeModal() {
      this.setState({ isModalOpen: false });
  }

  editBoard(boardId) {
    let currentBoardToEdit = this.state.existingBoards[boardId];
    this.setState({editedBoardName: currentBoardToEdit.name});
    this.setState({currentBoardBeingEditing: currentBoardToEdit});
    this.openEditModal();
  }

  saveEditedPinDescription() {
    let currentPinBeingEdited = this.state.currentPinBeingEditing;
    currentPinBeingEdited.description = this.state.editedPinDescription;

    let indexOfPinToEdit = this.getIndexOfPinById(currentPinBeingEdited.id);
    let tempBoard = this.state.currentBoardToShow;
    let tempPins = tempBoard.pins;//[indexOfPinToEdit];
    tempPins[indexOfPinToEdit] = currentPinBeingEdited;

    tempBoard.pins = tempPins;
    this.setState({currentBoardToShow: tempBoard});

    let tempBoards = this.state.existingBoards;
    let boardIndexToChange = this.getBoardIndexByName(currentPinBeingEdited.name);
    tempBoards[boardIndexToChange] = tempBoard;

    this.setState({existingBoards: tempBoards});
    this.updateBoardsInStorage();
    this.closeEditPinModal();
  }

  getBoardIndexByName(boardName) {
    // search each existingBoard for this name, return the index
    let existingBoards = this.state.existingBoards;

    for(let i = 0; i < existingBoards.length; i++) {
      let currentCheck = existingBoards[i];
      if(currentCheck.name === boardName) return currentCheck.id;
    }

    return -1;
  }

  saveEditedBoardName() {
    let currentBoardBeingEdited = this.state.currentBoardBeingEditing;
    currentBoardBeingEdited.name = this.state.editedBoardName;

    let tempBoards = this.state.existingBoards;
    tempBoards[currentBoardBeingEdited.id] = currentBoardBeingEdited;

    this.setState({existingBoards: tempBoards});
    this.updateBoardsInStorage();

    this.closeEditModal();
  }

  deleteBoard(boardId) {
    console.log("Will delete board with id of: ", boardId);
    let tempBoards = this.state.existingBoards;
    console.log("Existing Boards before removing: ", tempBoards);
    tempBoards.splice(boardId, 1);
    console.log("Exisitng boards after removing: ", tempBoards);
    //this.setState({existingBoards: tempBoards});
    //this.updateBoardsInStorage();
  }

  getIndexOfPinById(pinId) {
    let currentBoardToCheck = this.state.currentBoardToShow;
    for (let i = 0; i < currentBoardToCheck.pins.length; i++) {
      let pinToCheck = currentBoardToCheck.pins[i];
      if(pinToCheck.id === pinId) return i;
    }
    return -1;
  }

  editPin(pinId) {
    let indexOfPinToEdit = this.getIndexOfPinById(pinId);
    let pinToEdit = this.state.currentBoardToShow.pins[indexOfPinToEdit];

    console.log("Pin Found to edit: ", pinToEdit);

    this.setState({currentPinBeingEditing: pinToEdit});
    this.setState({editedPinDescription: pinToEdit.description});

    this.openEditPinModal();
  }

  deletePin(pinId) {
    let currentBoardShowing = this.state.currentBoardToShow;
    currentBoardShowing.pins.splice(pinId, 1);

    this.setState({currentBoardToShow: currentBoardShowing});

    let tempExistingBoards = this.state.existingBoards;
    tempExistingBoards[currentBoardShowing.id] = currentBoardShowing;

    this.setState({existingBoards: tempExistingBoards});
    this.updateBoardsInStorage();
  }

  updateBoardsInStorage() {
    localStorage.setItem('boardData', JSON.stringify(this.state.existingBoards));
  }

  showBoardDetails(board) {
    this.setState({currentBoardToShow: board});
    this.openModal();
  }

  render() {

    let boardCards = this.state.existingBoards
        .map( board => {
            return <Card item={board} editItem={this.editBoard} removeItem={this.deleteBoard} showItem={this.showBoardDetails} key={board.id} />
        });


    let currentBoardPinImages = this.state.currentBoardToShow.pins
        .map( pin => {
            return <div key={pin.id} className="pin-photo">
              <div className="pull-right pin-buttons">
                <div onClick={() => this.editPin(pin.id)} className="pin-edit"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></div>
                <div onClick={() => this.deletePin(pin.id)} className="pin-delete"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
              </div>
              <img src={pin.imageUrl} />
              <h2 className="pin-name">{pin.name}</h2>
              <div className="pin-description">{pin.description}</div>
            </div>
        });

    return (

      <div id="exploreWrap" className="container-fluid">
        <h1>
          Your Boards
        </h1>
        <div className="cards">
          <div className="cards_item">
            <div onClick={this.openCreateModal} className="card create-board-card">
              <div className="plus-symbol-holder">
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              </div>
              <div className="symbol-text">
                Create New Board
              </div>
            </div>
          </div>
          {boardCards}
        </div>

        <Modal assignedClass="full-screen" isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            <div className="modal-header"><h1>{this.state.currentBoardToShow.name}</h1></div>
            <div className="modal-content">
              <div className="cards current-board-details">
                {currentBoardPinImages}
              </div>
            </div>
            <div className="modal-footer">
              <Button color="primary" size="lg" block onClick={() => this.closeModal()}>Close</Button>
            </div>
        </Modal>

        <Modal assignedClass="normal" isOpen={this.state.isCreateModalOpen} onClose={() => this.closeCreateModal()}>
            <div className="modal-header"><h1>Create New Board</h1></div>
            <div className="modal-content">
              <div className="cards current-board-details">
                <InputGroup>
                  <Input id="newBoardName" type="text" onChange={this.updateNewBoardName} placeholder="New Board Name" value={this.state.newBoardName} />
                </InputGroup>
              </div>
            </div>
            <div className="modal-footer">
              <Button onClick={this.saveNewBoard} color="primary" size="lg" block>Save</Button>
            </div>
        </Modal>

        <Modal assignedClass="normal" isOpen={this.state.isEditModalOpen} onClose={() => this.closeEditModal()}>
            <div className="modal-header"><h1>Editing {this.state.currentBoardBeingEditing.name}</h1></div>
            <div className="modal-content">
              <div className="cards current-board-details">
                <InputGroup>
                  <Input id="editedBoardName" type="text" onChange={this.updateEditedBoardName} value={this.state.editedBoardName} />
                </InputGroup>
              </div>
            </div>
            <div className="modal-footer">
              <Container>
                <Row id="boardModalBtns">
                  <Col>
                    <Button onClick={this.saveEditedBoardName} color="primary" size="lg" block>Save</Button>
                  </Col>
                  <Col>
                    <Button id="edit-cancel" color="danger" size="lg" block onClick={() => this.closeEditModal()}>Cancel</Button>
                  </Col>
                </Row>
              </Container>
            </div>
        </Modal>




        <Modal assignedClass="normal" isOpen={this.state.isEditPinModalOpen} onClose={() => this.closeEditPinModal()}>
            <div className="modal-header"><h1>Editing {this.state.currentPinBeingEditing.name}</h1></div>
            <div className="modal-content">
              <div className="cards current-pin-details">
                <InputGroup>
                  <Input id="editedPinDescription" type="textarea" onChange={this.updateEditedPinDescription} value={this.state.editedPinDescription} />
                </InputGroup>
              </div>
            </div>
            <div className="modal-footer">
              <Container>
                <Row id="boardModalBtns">
                  <Col>
                    <Button onClick={this.saveEditedPinDescription} color="primary" size="lg" block>Save</Button>
                  </Col>
                  <Col>
                    <Button id="edit-cancel" color="danger" size="lg" block onClick={() => this.closeEditPinModal()}>Cancel</Button>
                  </Col>
                </Row>
              </Container>
            </div>
        </Modal>

      </div>
    );
  }
}

export default Explorepage;
