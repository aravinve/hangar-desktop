import React from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Image extends React.Component {
  state = {
    imageUrl: '',
  };
  componentDidMount() {
    ipcRenderer.on('image', (event, arg) => {
      this.setState({
        imageUrl: arg,
      });
    });
  }
  render() {
    return (
      <div>
        <h2>{this.state.imageUrl} </h2>
        <img
          src={this.state.imageUrl}
          alt='image'
          style={{ maxWidth: '100%' }}
        />
      </div>
    );
  }
}

export default Image;
