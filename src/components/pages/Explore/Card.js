import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
      super(props);

      this.state = {
        board: this.props.item
      };

      this.deleteBoard = this.deleteBoard.bind(this);
      this.passUpItemToShow = this.passUpItemToShow.bind(this);
  }

  passUpItemToShow() {
    this.props.showItem(this.state.board);
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
            <div onClick={this.deleteBoard} className="pin-delete"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
            <div className="card_title">{this.state.board.name}</div>
            <div onClick={this.passUpItemToShow} className="card_pins">
                {boardPins}
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default Card;
