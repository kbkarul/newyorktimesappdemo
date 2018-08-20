import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {"articles":[], "filteredArticles": []};
    this.filterArticle = this.filterArticle.bind(this);
  }
  filterArticle(e) {
    const s = e.target.value.trim().toLowerCase();
    const fArticles = this.state.articles.filter(r => r.title.toLowerCase().indexOf(s) !== -1);
    this.setState({filteredArticles: fArticles});
  }
  render() {
    return (
      <div className="App">
        <header className="Section-header">
          <h1 className="App-title">NY Times Most Popular</h1>
        </header>
        <div className="">
          <input type="text" className="searchBox" onChange={this.filterArticle} placeholder="Search article by title"/>
        </div>
        {this.state.filteredArticles.map(article =>
        <div key={article.id} className="articleContainer">
          <div className="imageContainer"><img className="authorImage" width="40" height="40" src={article.media[0]["media-metadata"][0].url}/></div>
          <div className="fullWidth">
            <div className="titleText">{article.title}</div>
            <div>
              <span className="authorText">{article.byline}</span>
              <span className="publishedDate">{article.published_date}</span>
            </div>
          </div>
        </div>
      )}
      </div>
    );
  }

  async componentDidMount() {
    let allSectionResponse = await fetch('http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?apikey=756d0c0d3b8e439ca7bc47af442fe0dc')
    let jsonContent = await allSectionResponse.json();
    const result = jsonContent.results;
    this.setState({"articles" : result, "filteredArticles" : result});
  }
}

export default App;
