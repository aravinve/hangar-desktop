// import React from 'react';
// import PlayCard from './PlayCard';
// import Dashboard from '../home/Dashboard';

// class Play extends React.Component {
//   state = {
//     playCard: [
//       {
//         id: '1',
//         name: 'Snake',
//         imageUrl: require('../../img/Logo_Hangar.png'),
//         to: '/play/snake',
//       },
//       {
//         id: '2',
//         name: '2048',
//         imageUrl: require('../../img/Logo_Hangar.png'),
//         to: '/play/2048',
//       },
//       {
//         id: '3',
//         name: 'Hangman',
//         imageUrl: require('../../img/Logo_Hangar.png'),
//         to: '/play/hangman',
//       },
//     ],
//   };

//   render() {
//     const playCards = this.state.playCard.map((data) => (
//       <PlayCard key={data.id} data={data} />
//     ));
//     return (
//       <React.Fragment>
//         <div className='container'>
//           <div className='columns'>
//             <div className='column is-6' style={{ margin: 'auto' }}>
//               <div className='columns' style={{ marginTop: '4rem' }}>
//                 <div className='column'>
//                   <h2 className='is-title' style={{ textAlign: 'center' }}>
//                     Play Center
//                   </h2>
//                 </div>
//               </div>
//               <div className='columns' style={{ marginTop: '4rem' }}>
//                 {playCards}
//               </div>
//             </div>
//           </div>
//         </div>
//         <Dashboard />
//       </React.Fragment>
//     );
//   }
// }

// export default Play;

import React, { Component } from 'react';
import Dashboard from '../home/Dashboard';

class Play extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className='container'
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <h1 className='is-title'>Under Construction</h1>
          <div className='container' style={styleOverlay}></div>
        </div>
        <Dashboard />
      </React.Fragment>
    );
  }
}

const styleOverlay = {
  width: '50%',
  height: '60vh',
  backgroundImage: 'url(' + require('../../img/under_construction.png') + ')',
  backgroundSize: 'cover',
  backgroundClip: 'border-box',
  backgroundPosition: 'center',
  opacity: '100%',
  backgroundRepeat: 'no-repeat',
  WebkitAnimation: 'fadein 2s',
  MozAnimation: 'fadein 2s',
  animation: 'fadein 2s',
};

export default Play;
