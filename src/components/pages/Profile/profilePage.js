import React, { Component } from 'react';

class Profilepage extends Component {
  constructor(props) {
      super(props);

      this.state = {

      };
}


  render() {
    return (

      <div id="profileWrap" className="container-fluid">
        <div id="secondaryMenu">
        <p>Settings icon</p>
        <p>Dummy icon1</p>
        <p>Dummy icon2</p>
        </div>
        <h1>
          Users Name Here
        </h1>
        <div id="profilePic"><img src="cinqueterre.jpg" className="img-thumbnail" alt="Cinque Terre" /></div>
        <div id="followGroup">
          <p>'followers (counter)'</p>
          <p>'following (counter)'</p>
        </div>
        <div id="boardNav">
          <ul className="nav nav-pills">
            <li className="active"><a href="">Boards</a></li>
            <li><a href="">Pins</a></li>
          </ul>
        </div>
        <div id="boardContainer" className="container-fluid">
          <div>Create Board</div>
          <div>Existing Boards</div>
          <div>Existing Boards</div>
        </div>
      </div>
    );
  }
}

export default Profilepage;
