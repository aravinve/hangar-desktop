import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Home from './components/home/Home';
import Splash from './components/splash/Splash';
import News from './components/news/News';
import Reddit from './components/reddit/Reddit';
import Music from './components/music/Music';
import Gallery from './components/gallery/Gallery';
import Maps from './components/maps/Maps';
import Notes from './components/notes/Notes';
import Board from './components/board/Board';
import Weather from './components/weather/Weather';
import Calculator from './components/calculator/Calculator';
import Clock from './components/clock/Clock';
import Calendar from './components/calendar/Calendar';
import Cook from './components/cook/Cook';
import Dictionary from './components/dictionary/Dictionary';
import Covid from './components/covid/Covid';
import Todoist from './components/todoist/Todoist';
import Converter from './components/converter/Converter';
import Wikipedia from './components/wikipedia/Wikipedia';
import Hackernews from './components/hackernews/Hackernews';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Splash} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/news' component={News} />
        <Route exact path='/cook' component={Cook} />
        <Route exact path='/music' component={Music} />
        <Route exact path='/gallery' component={Gallery} />
        <Route exact path='/maps' component={Maps} />
        <Route exact path='/board' component={Board} />
        <Route exact path='/notes' component={Notes} />
        <Route exact path='/dictionary' component={Dictionary} />
        <Route exact path='/weather' component={Weather} />
        <Route exact path='/todoist' component={Todoist} />
        <Route exact path='/calculator' component={Calculator} />
        <Route exact path='/clock' component={Clock} />
        <Route exact path='/calendar' component={Calendar} />
        <Route exact path='/converter' component={Converter} />
        <Route exact path='/reddit' component={Reddit} />
        <Route exact path='/wikipedia' component={Wikipedia} />
        <Route exact path='/covid' component={Covid} />
        <Route exact path='/hackernews' component={Hackernews} />
      </Switch>
    </HashRouter>
  );
}

export default App;
