import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
  //Link
} from 'react-router-dom';

// Components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Explorepage from './components/pages/Explore/explorePage';
import Boardpage from './components/pages/Board/boardPage';
import Profilepage from './components/pages/Profile/profilePage';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Header />

          <Route exact path='/' component={Explorepage} />
          <Route exact path='/Boards' component={Boardpage} />
          <Route exact path='/Profile' component={Profilepage} />


        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
