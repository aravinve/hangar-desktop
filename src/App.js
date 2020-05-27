import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Splash from './components/splash/Splash';
import News from './components/news/News';
import Reddit from './components/reddit/Reddit';
import Music from './components/music/Music';
import Weather from './components/weather/Weather';
import Calculator from './components/calculator/Calculator';
import Cook from './components/cook/Cook';
import Dictionary from './components/dictionary/Dictionary';
import Covid from './components/covid/Covid';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Splash} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/news' component={News} />
        <Route exact path='/cook' component={Cook} />
        <Route exact path='/dictionary' component={Dictionary} />
        <Route exact path='/weather' component={Weather} />
        <Route exact path='/calculator' component={Calculator} />
        <Route exact path='/music' component={Music} />
        <Route exact path='/reddit' component={Reddit} />
        <Route exact path='/covid' component={Covid} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
