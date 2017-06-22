import React, { Component } from 'react';
import $ from 'jquery';

import ItemGrid from './ItemGrid';

class Homepage extends Component {

    constructor(props) {
      super(props);

      this.state = {
        comics: []
      };

      //<SearchBar></SearchBar>
    }

    componentDidMount() {
        this.getComicList();
    }

    getComicList() {
        var apiKey = "89629247aa3c362dd969166b19dec207";
        var url = "https://gateway.marvel.com:443/v1/public/characters?apikey=" + apiKey + "&limit=100";
        //var apiData = null;

        return $.getJSON(url)
            .then((apiData) => this.setState({ comics: apiData.data.results }));
    }

    render() {
        return (
            <div>
                <ItemGrid comics={this.state.comics}></ItemGrid>
            </div>
        );
    }
}

export default Homepage;
