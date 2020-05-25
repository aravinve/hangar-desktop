import React, { Component } from 'react';
import Overlay from './Overlay';
import Dashboard from './Dashboard';
import axios from 'axios';
import StickyNote from './StickyNote';
import dragElement from './drag';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: 'mountains',
      amount: 15,
      apiUrl: 'https://pixabay.com/api/',
      apiKey: '', // Refer GDocs
      images: [],
      url: '',
      clock: '',
      showSettings: false,
      stickyNote: false,
    };
  }

  componentDidMount = () => {
    this.loadImages(this.state.searchText);
    this.showClock();
    setInterval(this.showClock, 60000);
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
    console.log(this.state.stickyNote);
    if (
      prevState.stickyNote !== this.state.stickyNote &&
      this.state.stickyNote
    ) {
      dragElement(document.getElementById('mydiv'));
    }
  }

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
    console.log(this.state.searchText);
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

  showClock = () => {
    const dateObject = new Date();
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const timeString = `${date}-${month}-${year}  ${hours}:${minutes}`;
    this.setState({ clock: timeString });
  };

  showStickyNote = () => {
    this.setState({ stickyNote: !this.state.stickyNote });
  };

  render() {
    const data = JSON.parse(localStorage.getItem('loginData'));
    return (
      <React.Fragment>
        <Overlay
          imageUrl={this.state.url}
          changeOverlay={this.changeOverlay}
          userName={data.hangarName}
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
