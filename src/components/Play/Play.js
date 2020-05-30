import React from 'react';
import PlayCard from './PlayCard';
import Dashboard from '../home/Dashboard';

class Play extends React.Component {
  state = {
    playCard: [
      {
        id: '1',
        name: 'Snake',
        imageUrl: require('../../img/Logo_Hangar.png'),
        to: '/play/snake',
      },
      {
        id: '2',
        name: '2048',
        imageUrl: require('../../img/Logo_Hangar.png'),
        to: '/play/2048',
      },
      {
        id: '3',
        name: 'Hangman',
        imageUrl: require('../../img/Logo_Hangar.png'),
        to: '/play/hangman',
      },
    ],
  };

  render() {
    const playCards = this.state.playCard.map((data) => (
      <PlayCard key={data.id} data={data} />
    ));
    return (
      <React.Fragment>
        <div className='container'>
          <div className='columns'>
            <div className='column is-6' style={{ margin: 'auto' }}>
              <div className='columns' style={{ marginTop: '4rem' }}>
                <div className='column'>
                  <h2 className='is-title' style={{ textAlign: 'center' }}>
                    Play Center
                  </h2>
                </div>
              </div>
              <div className='columns' style={{ marginTop: '4rem' }}>
                {playCards}
              </div>
            </div>
          </div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

export default Play;
