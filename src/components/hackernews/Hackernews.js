import React, { Component } from 'react';
import Dashboard from '../home/Dashboard';
import SidePane from './SidePane';
import HackerBar from './HackerBar';

class Hackernews extends Component {
  state = {
    header: '',
    stories: [],
  };

  componentDidMount = () => {
    const testURL = 'https://hacker-news.firebaseio.com/v0/newstories.json';
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const dataIds = data.slice(0, 10);
        dataIds.map((id) => {
          const fetchUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
          const myInit = {
            mode: 'no-cors',
          };
          const fetchRequest = new Request(fetchUrl, myInit);
          fetch(fetchRequest)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              this.setState({
                stories: this.state.stories.concat(data),
                header: 'New Stories',
              });
            });
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  render() {
    const hackerData =
      this.state.stories.length > 0
        ? this.state.stories.map((story) => (
            <HackerBar key={story.id} story={story} />
          ))
        : null;
    return (
      <React.Fragment>
        <div className='columns'>
          <SidePane />
          <div className='column is-9' style={{ marginTop: '4rem' }}>
            {this.state.header !== '' ? (
              <h2 className='is-title'>{this.state.header} </h2>
            ) : null}
            {hackerData}
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Hackernews;
