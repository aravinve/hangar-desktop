import React, { Component } from 'react';
import axios from 'axios';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const Menu = electron.remote.Menu;

class Home extends Component {
  state = {
    posts: [],
  };
  componentDidMount() {
    this.initMenu();
    axios
      .get('https://www.reddit.com/r/aww.json')
      .then((res) => {
        this.setState({
          posts: res.data.data.children,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  showImage = (image) => {
    ipcRenderer.send('toggle-image', image);
  };
  initMenu = () => {
    const menu = Menu.buildFromTemplate([
      {
        label: 'File',
        submenu: [
          { label: 'New Window' },
          {
            label: 'Settings',
            accelerator: 'CmdOrCtrl+,',
            click: () => {
              ipcRenderer.send('toggle-settings');
            },
          },
          { type: 'separator' },
          {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
          },
        ],
      },
      {
        label: 'Edit',
        submenu: [
          { label: 'Menu Item 1' },
          { label: 'Menu Item 2' },
          { label: 'Menu Item 3' },
        ],
      },
    ]);
    Menu.setApplicationMenu(menu);
  };
  render() {
    return (
      <div>
        <div className='container'>
          <h1 className='text-secondary'>Hangar</h1>
          <ul className='list-group'>
            {this.state.posts.map((post) => (
              <li
                key={post.data.id}
                className='list-group-item flex-container'
                onClick={() =>
                  this.showImage(post.data.preview.images[0].source.url)
                }
              >
                <img
                  src={post.data.thumbnail}
                  alt='thumb'
                  className='thumbnail'
                />
                <div>{post.data.title}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
