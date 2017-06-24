import React, { Component } from 'react';
import $ from 'jquery';
import Masonry from 'react-masonry-component';
import classnames from 'classnames';
import { Container, Row, Col, InputGroup, InputGroupAddon, Input, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';

import Item from './Item';
import Modal from '../modal';

class ItemGrid extends Component {
    constructor(props) {
        super(props);

        let boardData = JSON.parse(localStorage.getItem('boardData'));
        if(!boardData) boardData = [];

        console.log("Current board data from local storage: ", boardData);

        this.state = {
            isModalOpen: false,
            currentItemBeingSaved: {},
            currentImageBeingSaved: "",
            activeTab: '1',
            existingBoards: boardData
        };

        this.saveComic = this.saveComic.bind(this);
        this.newBoardNameChanged = this.newBoardNameChanged.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.toggle = this.toggle.bind(this);
        this.chooseExistingBoard = this.chooseExistingBoard.bind(this);
        this.saveComicToBoard = this.saveComicToBoard.bind(this);
    }

    saveComic(item) {
        let description = item.description;
        if(!description) item.description = "No description";

        item.boardName = "";
        item.isExisting = 0;

        let imageUrl = item.thumbnail.path + "." + item.thumbnail.extension;
        this.setState({currentImageBeingSaved: imageUrl});

        item.imageUrl = imageUrl;
        this.setState({currentItemBeingSaved: item});

        this.openModal();
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    chooseExistingBoard(boardName) {
        let currentItemBeingChanged = this.state.currentItemBeingSaved;
        currentItemBeingChanged.boardName = boardName;
        currentItemBeingChanged.isExisting = 1;
        this.setState({ currentItemBeingSaved: currentItemBeingChanged });
    }

    newBoardNameChanged(e) {
      let currentItemBeingChanged = this.state.currentItemBeingSaved;
      currentItemBeingChanged.boardName = e.target.value;
      currentItemBeingChanged.isExisting = 0;
      this.setState({ currentItemBeingSaved: currentItemBeingChanged });
    }

    updateDescription(e) {
      let currentItemBeingChanged = this.state.currentItemBeingSaved;
      currentItemBeingChanged.description = e.target.value;
      this.setState({ currentItemBeingSaved: currentItemBeingChanged });
    }

    saveComicToBoard() {
      let itemToSave = this.state.currentItemBeingSaved;

      let newPin = {};
      newPin.id = 0;
      newPin.name = itemToSave.name;
      newPin.description = itemToSave.description;
      newPin.imageUrl = itemToSave.imageUrl;

      if(!itemToSave.isExisting) {
        let newBoard = {};
        newBoard.id = this.state.existingBoards.length;
        newBoard.name = itemToSave.boardName;
        newBoard.pins = [newPin];

        this.state.existingBoards.push(newBoard);
      }
      else {
        let boardIndex = this.getBoardIndexByName(itemToSave.boardName);
        newPin.id = this.state.existingBoards[boardIndex].pins.length;
        this.state.existingBoards[boardIndex].pins.push(newPin);
      }

      this.closeModal();

      localStorage.setItem('boardData', JSON.stringify(this.state.existingBoards));
    }

    getBoardIndexByName(boardName) {
      // search each existingBoard for this name, return the index
      let existingBoards = this.state.existingBoards;

      for(let i = 0; i < existingBoards.length; i++) {
        let currentCheck = existingBoards[i];
        if(currentCheck.name === boardName) return i;
      }

      return -1;
    }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }

    render() {
        let masonryOptions = {
            transitionDuration: '1.0s',
            fitWidth: true,
            columnWidth: 60,
            gutter: 5
        };

        let GridItems = this.props.comics
            .filter( comic => (
                comic.thumbnail.path.toLowerCase().indexOf("image_not_available".toLowerCase()) === -1))
            .map( (comic, i) => {
                return <Item item={comic} saveItem={this.saveComic} key={i} className="image-element-class" />
            });

        let ExistingBoardOptions = this.state.existingBoards
            .map( (board, i) => {
                return <ListGroupItem tag="button" key={i} onClick={() => this.chooseExistingBoard(board.name)} action>{board.name}</ListGroupItem>
            });

        return (
            <div id="iGridComponent">
                <Masonry
                    className={'my-gallery-class'} // default ''
                    elementType={'div'} // default 'div'
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} >
                    {GridItems}
                </Masonry>

                <Modal id="savePinModal" isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>

                    <div className="modal-header"><h1>Save To Board</h1></div>
                    <div className="modal-content">
                      <Container>
                        <Row>
                          <Col id="left-side">
                          <center><img src={this.state.currentImageBeingSaved} className="modal-photo" /></center>
                          <h2>{this.state.currentItemBeingSaved.name}</h2>
                          <InputGroup>
                            <Input id="comicDescription" type="textarea" onChange={this.updateDescription} placeholder="description" value={this.state.currentItemBeingSaved.description} />
                          </InputGroup>
                          </Col>

                          <Col>
                          <Nav tabs>
                            <NavItem>
                              <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                              >
                                Save to New Board
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                              >
                                Save to Existing Board
                              </NavLink>
                            </NavItem>
                          </Nav>
                          <TabContent activeTab={this.state.activeTab}>
                          <TabPane tabId="1">
                            <InputGroup>
                              <Input type="text" onChange={this.newBoardNameChanged} placeholder="New Board Name" value={this.state.currentItemBeingSaved.boardName} />
                            </InputGroup>
                          </TabPane>
                            <TabPane tabId="2">
                              <Row>
                                <Col sm="12">
                                  <ListGroup>
                                    {ExistingBoardOptions}
                                  </ListGroup>
                                </Col>
                              </Row>
                            </TabPane>
                          </TabContent>

                          <Row id="boardModalBtns">
                            <Col>
                              <Button id="modal-save" color="primary" size="lg" block onClick={() => this.saveComicToBoard()}>Save</Button>
                            </Col>
                            <Col>
                              <Button id="modal-cancel" color="danger" size="lg" block onClick={() => this.closeModal()}>Cancel</Button>
                            </Col>
                          </Row>

                          </Col>
                        </Row>
                      </Container>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default ItemGrid;
