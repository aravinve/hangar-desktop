import React, { Component } from 'react';
import Dashboard from '../home/Dashboard';
import SidePane from './SidePane';
import RedditBar from './RedditBar';

class Reddit extends Component {
  state = {
    apiUrl: 'https://www.reddit.com/r',
    articles: [],
    searchArticle: '',
  };

  loadArticle(searchTerm) {
    const testURL = `${this.state.apiUrl}/${searchTerm}.json`;
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ articles: data.data.children });
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchArticle = () => {
    this.loadArticle(this.state.searchArticle);
  };

  render() {
    const redditData = this.state.articles.map((post) => (
      <React.Fragment>
        <RedditBar key={post.data.id} post={post} />
      </React.Fragment>
    ));
    return (
      <React.Fragment>
        <div className='columns'>
          <SidePane
            handleChange={this.handleChange}
            searchArticle={this.searchArticle}
          />
          <div className='column is-9' style={{ marginTop: '4rem' }}>
            {this.state.searchArticle !== '' ? (
              <div className='tag is-black' style={{ marginBottom: '1rem' }}>
                Subreddit: {this.state.searchArticle}
              </div>
            ) : null}
            {redditData}
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Reddit;
