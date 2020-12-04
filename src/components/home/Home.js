import React, { Component } from 'react';
import Overlay from './Overlay';
import Dashboard from './Dashboard';
import axios from 'axios';
import StickyNote from './StickyNote';
import dragElement from './drag';

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
// const Menu = require('electron').remote.Menu

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: 'mountains',
      amount: 15,
      apiUrl: 'https://pixabay.com/api/',
      apiKey: process.env.REACT_APP_PIXABAY_KEY,
      images: [],
      url: '',
      clock: '',
      showSettings: false,
      stickyNote: false,
      userData: '',
    };
  }

  componentDidMount = () => {
    ipcRenderer.on('userData', (event, arg) => {
      this.setState({ userData: arg });
    });
    const data = JSON.parse(localStorage.getItem('loginData'));
    if (this.state.userData === '') {
      this.setState({ userData: data });
    }
    //this.initMenu();
    this.loadImages(this.state.searchText);
    this.showClock();
    setInterval(this.showClock, 60000);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.stickyNote !== this.state.stickyNote &&
      this.state.stickyNote
    ) {
      dragElement(document.getElementById('mydiv'));
    }
  }

  // initMenu = () => {
  //   const menu = Menu.buildFromTemplate([
  //     {
  //       label: 'File',
  //       submenu: [
  //         {
  //           label: 'Settings',
  //           accelerator: 'CmdOrCtrl+,',
  //           click: () => {
  //             this.toggleSettings();
  //           },
  //         },
  //         { type: 'separator' },
  //         {
  //           label: 'Quit',
  //           accelerator: 'CmdOrCtrl+Q',
  //           click: () => {
  //             localStorage.clear();
  //             ipcRenderer.send('logout');
  //           },
  //         },
  //       ],
  //     },
  //   ]);
  //   Menu.setApplicationMenu(menu);
  // };

  changeOverlay = () => {
    const imagesArray = this.state.images;
    const randomImage =
      imagesArray[Math.floor(Math.random() * imagesArray.length)];
    this.setState({
      url: randomImage.largeImageURL,
    });
  };

  loadImages = (searchTerm) => {
    axios
      .get(
        `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${searchTerm}&image_type=photo&per_page=${this.state.amount}&safeSearch=true`
      )
      .then((res) => {
        const imagesArray = res.data.hits;
        const randomImage =
          imagesArray[Math.floor(Math.random() * imagesArray.length)];
        this.setState({
          images: imagesArray,
          url: randomImage.largeImageURL,
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeSearchTerm = () => {
    document.getElementById('searchText').value = '';
    this.loadImages(this.state.searchText);
  };

  changeSettingsMenu = (e) => {
    const settingsMenu = e.currentTarget;
    const settingsMenuText = settingsMenu.innerText;
    if (settingsMenuText === 'Background') {
      document.querySelector('#settings-background').style.display = 'block';
      document.querySelector('#settings-preference').style.display = 'none';
      document.querySelector('#settings-account').style.display = 'none';
    } else if (settingsMenuText === 'Preferences') {
      document.querySelector('#settings-background').style.display = 'none';
      document.querySelector('#settings-preference').style.display = 'block';
      document.querySelector('#settings-account').style.display = 'none';
    } else {
      document.querySelector('#settings-background').style.display = 'none';
      document.querySelector('#settings-preference').style.display = 'none';
      document.querySelector('#settings-account').style.display = 'block';
    }
  };

  toggleSettings = () => {
    this.setState({ showSettings: !this.state.showSettings });
  };

  addZero = (n) => (n < 10 ? '0' + n : n);

  showClock = () => {
    const dateObject = new Date();
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = this.addZero(dateObject.getMinutes());
    const timeString = `${date}-${month}-${year}  ${hours}:${minutes}`;
    this.setState({ clock: timeString });
  };

  showStickyNote = () => {
    this.setState({ stickyNote: !this.state.stickyNote });
  };

  render() {
    const data = JSON.parse(localStorage.getItem('loginData'));
    if (this.state.userData === undefined) {
      this.setState({ userData: data });
    }
    return (
      <React.Fragment>
        <Overlay
          imageUrl={this.state.url}
          changeOverlay={this.changeOverlay}
          userName={this.state.userData.hangarName}
          handleChange={this.handleChange}
          changeSearchTerm={this.changeSearchTerm}
          changeSettingsMenu={this.changeSettingsMenu}
          showSettings={this.state.showSettings}
          clock={this.state.clock}
        />
        {this.state.stickyNote ? <StickyNote /> : null}
        <Dashboard
          toggleSettings={this.toggleSettings}
          showStickyNote={this.showStickyNote}
        />
      </React.Fragment>
    );
  }
}

export default Home;
