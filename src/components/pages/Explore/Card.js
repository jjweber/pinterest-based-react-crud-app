import React, { Component } from 'react';

import { Button } from 'reactstrap';

class Card extends Component {
  constructor(props) {
      super(props);

      this.state = {
        board: this.props.item
      };

      this.editBoard = this.editBoard.bind(this);
      this.deleteBoard = this.deleteBoard.bind(this);
      this.passUpItemToShow = this.passUpItemToShow.bind(this);
  }

  passUpItemToShow() {
    this.props.showItem(this.state.board);
  }

  editBoard() {
    console.log("Will pass up request to edit board with id of: ", this.state.board.id);
    this.props.editItem(this.state.board.id);
  }

  deleteBoard() {
    console.log("Will pass up request to delete board with id of: ", this.state.board.id);
    //this.props.removeItem(this.state.board.id);
  }

  render() {

    let boardPins = this.state.board.pins
        .map( pin => {
            return <img key={pin.id} src={pin.imageUrl} className="pin-photo" />
        });

    return (
      <div className="cards_item">
        <div className="card">
          <div className="card_content">
            <div className="pull-right">
              <div onClick={this.deleteBoard} className="pin-delete"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
              <div onClick={this.editBoard} className="pin-edit"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></div>
            </div>

            <div className="card_title">{this.state.board.name}</div>
            <div className="card_pins">
                {boardPins}
            </div>
            <div className="card_footer">
              <Button color="primary" size="lg" block onClick={this.passUpItemToShow}>Open Board</Button>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default Card;
