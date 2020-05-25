import React, { Component } from 'react';
import Article from './Article';
import SidePane from './SidePane';
import ContentFrame from './ContentFrame';
import Dashboard from '../home/Dashboard';

class News extends Component {
  state = {
    apiUrl: 'https://newsapi.org/v2',
    country: 'us',
    apiKey: '', // Refer GDocs
    articles: [],
    searchArticle: '',
    searchCountry: 'us',
    contentData: '',
    contentUrl: '',
  };

  componentDidMount() {
    this.loadArticle(this.state.searchArticle, this.state.searchCountry);
  }

  loadArticle(searchTerm, searchCountry) {
    let testURL = '';
    if (searchTerm.length > 0) {
      testURL = `${this.state.apiUrl}/everything?q=${searchTerm}&apikey=${this.state.apiKey}`;
    } else {
      testURL = `${this.state.apiUrl}/top-headlines?country=${searchCountry}&apikey=${this.state.apiKey}`;
    }
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ articles: data.articles });
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchArticle = () => {
    this.loadArticle(this.state.searchArticle, this.state.searchCountry);
  };

  activateContentFrame = (content, url) => {
    this.setState({ contentData: content, contentUrl: url });
  };

  render() {
    const articlesData =
      this.state.articles != null
        ? this.state.articles.map((article) => (
            <Article
              key={article.publishedAt}
              article={article}
              activateContentFrame={this.activateContentFrame}
            />
          ))
        : null;
    return (
      <React.Fragment>
        <div className='columns'>
          <SidePane
            handleChange={this.handleChange}
            searchArticle={this.searchArticle}
          />
          <div className='column is-6' style={{ marginTop: '4rem' }}>
            {articlesData}
          </div>
          <ContentFrame
            contentData={this.state.contentData}
            contentUrl={this.state.contentUrl}
          />
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}
export default News;
