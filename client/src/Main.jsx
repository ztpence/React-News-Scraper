import React, { Component } from "react";
import axios from "axios";

import SearchForm from "./Main/SearchForm";
import Results from "./Main/Results";
import SavedArticles from "./Main/SavedArticles";

class Main extends Component {

    state = {
        savedArticles: [],
        results: [],
    }

  testAjax = () => {
    axios
      .get("/api/articles")
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  handleSubmitSearch = query => {
    console.log('query', query)
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    // add the api key parameter (the one we received when we registered)
    queryURL += "?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

    queryURL += "&q=" + query.title;

    if (parseInt(query.startYear)) {
        queryURL += "&begin_date=" + query.startYear + "0101";
    }

    if (parseInt(query.endYear)) {
        queryURL += "&end_date=" + query.endYear + "0101";
    }

    axios
        .get(queryURL)
        .then(res => {
            console.log('res',res)

            this.setState({
                results: res.data.response.docs
            })
        })
        .catch(err => {
            console.log(err.response)
        })
  }

  render() {
    return (
      <main>
        <SearchForm handleSubmitSearch={this.handleSubmitSearch} />
        <Results results={this.state.results} />
        <SavedArticles />
        <button onClick={this.testAjax}>Test ajax</button>
      </main>
    );
  }
}

export default Main;