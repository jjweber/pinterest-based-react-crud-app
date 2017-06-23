import React, { Component } from 'react';

import Card from './Card';
import Modal from '../modal';

import { Container, Row, Col, Button } from 'reactstrap';

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
        currentBoardToShow: initialBoardToShow,
        boardDetailsPins: {}
      };

      this.showBoardDetails = this.showBoardDetails.bind(this);
      this.deleteBoard = this.deleteBoard.bind(this);
  }

  openModal() {
      this.setState({ isModalOpen: true });
  }

  closeModal() {
      this.setState({ isModalOpen: false });
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
    console.log("Showing board details for board: ", board);

    this.setState({currentBoardToShow: board});

    this.openModal();
  }

  render() {

    let boardCards = this.state.existingBoards
        .map( board => {
            return <Card item={board} removeItem={this.deleteBoard} showItem={this.showBoardDetails} key={board.id} />
        });


    let currentBoardPinImages = this.state.currentBoardToShow.pins
        .map( pin => {
            return <div key={pin.id} className="pin-photo">
              <div onClick={() => this.deletePin(pin.id)} className="pin-delete"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
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
          {boardCards}
        </div>

        <Modal assignedClass="full-screen" isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            <div className="modal-header"><h1>{this.state.currentBoardToShow.name}</h1></div>
            <div className="modal-content">
              <div className="cards current-board-details">
                {currentBoardPinImages}
              </div>
            </div>
            <Container>
              <Row>
                <Col>
                  <Button color="secondary" size="lg" block onClick={() => this.closeModal()}>Close</Button>
                </Col>
              </Row>
          </Container>
        </Modal>



      </div>
    );
  }
}

export default Explorepage;
