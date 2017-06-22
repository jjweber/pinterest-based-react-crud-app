import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import * as firebase from 'firebase';

// Includes
import './Assets/css/default.min.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBXTJjgW8KwMOthQvaTcLugRqHDI43Swfk",
  authDomain: "pinterest-based-react-crud-app.firebaseapp.com",
  databaseURL: "https://pinterest-based-react-crud-app.firebaseio.com",
  storageBucket: "pinterest-based-react-crud-app.appspot.com",
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
