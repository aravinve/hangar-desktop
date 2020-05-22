import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Splash from './components/splash/Splash';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Splash} />
        <Route exact path='/home' component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
