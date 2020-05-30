import React, { Component } from 'react';
import Dashboard from '../home/Dashboard';
import SidePane from './SidePane';
import WikiCard from './WikiCard';

class Wikipedia extends Component {
  state = {
    articles: '',
    searchArticle: '',
  };

  loadArticle(searchTerm) {
    if (searchTerm !== '') {
      const testURL = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json`;
      const myInit = {
        mode: 'no-cors',
      };
      const myRequest = new Request(testURL, myInit);
      fetch(myRequest)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.setState({ articles: data });
        })
        .catch(function (e) {
          console.log(e);
        });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchArticle = () => {
    this.loadArticle(this.state.searchArticle);
  };

  render() {
    let wikiHeader = '';
    let requiredArray = [];
    if (this.state.articles !== '') {
      wikiHeader = this.state.articles[0];
      const wikiCardHeader = this.state.articles[1];
      const wikiUrls = this.state.articles[3];
      requiredArray = wikiUrls.map((wikiUrl, index) => {
        return { name: wikiCardHeader[index], url: wikiUrl };
      });
    }

    const articlesData = requiredArray.map((data) => (
      <WikiCard key={data.name} name={data.name} url={data.url} />
    ));
    return (
      <React.Fragment>
        <div className='columns'>
          <SidePane
            handleChange={this.handleChange}
            searchArticle={this.searchArticle}
          />
          <div className='column is-6' style={{ marginTop: '4rem' }}>
            <div className='columns'>
              <div className='column'>
                <h4 className='is-title'>{wikiHeader} </h4>
              </div>
            </div>
            {articlesData}
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Wikipedia;
