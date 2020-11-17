import React, { Component } from 'react';
import Dashboard from '../home/Dashboard';
import SidePane from './SidePane';
import DicDataCard from './DicDataCard';

class Dictionary extends Component {
  state = {
    apiUrl: 'https://www.dictionaryapi.com/api/v3/references/collegiate/json',
    apiKey: process.env.REACT_APP_DICTIONARY_KEY,
    result: [],
    searchWord: '',
  };

  loadResult(searchWord) {
    const testURL = `${this.state.apiUrl}/${searchWord}/?key=${this.state.apiKey}`;
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ result: data });
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === '') {
      this.setState({ result: [] });
    }
  };

  searchWord = () => {
    this.loadResult(this.state.searchWord);
  };

  render() {
    const resultsData = this.state.result.map((data) => (
      <DicDataCard key={data.meta.uuid} data={data} />
    ));
    return (
      <React.Fragment>
        <div className='columns'>
          <SidePane
            handleChange={this.handleChange}
            searchWord={this.searchWord}
          />
          <div
            className='column is-9'
            style={{ marginTop: '4rem', padding: '2rem' }}
          >
            {this.state.searchWord !== '' ? (
              <h3 className='is-title box has-background-light'>
                {this.state.searchWord}{' '}
              </h3>
            ) : null}
            {resultsData}
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Dictionary;
