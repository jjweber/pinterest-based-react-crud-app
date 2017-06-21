import React, { Component } from 'react';

class Homepage extends Component {
  constructor(props) {
      super(props);

      this.state = {

      };
}


  render() {
    return (

        <div id="homeWrap" className="container-fluid">
          <div className="jumbotron">
            <h1>Weber Pinterest</h1>
            <p>
            "Welcome to my Pinterest based React Crud App. Create, post, and share pins of your favorite hobbies and topics."
            </p>
          </div>





          <div className="modal fade container-fluid loginModal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <h2>Login</h2>
                <form action="">
                  <label htmlFor="userName"></label>
                  <input id="userName" type="text" onChange={this.handleNameChange} placeholder="Enter Username" value="" />
                  <label htmlFor="userPw"></label>
                  <input id="userPw" type="password" onChange={this.handleNameChange} placeholder="Enter Password" value="" />
                </form>

                <button type="submit" className="btn btn-success">Save</button>
                <button type="button" className="btn btn-danger" onClick={this.closeLogin}>Cancel</button>
              </div>
            </div>
          </div>



          <div className="modal fade container-fluid signupModal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <h2>Signin</h2>
                <form id="register-form">
                    <input id="un" type="text" onChange={this.handleNameChange} placeholder="Username" value="" />
                    <input id="pwd" type="password" onChange={this.handleNameChange} placeholder="Password" value="" />
                </form>

                <button type="submit" className="btn btn-success" onClick={this.store}>Save</button>
                <button type="button" className="btn btn-danger" onClick={this.closeSignup}>Cancel</button>
              </div>
            </div>
          </div>
        </div>


    );
  }
}

export default Homepage;
