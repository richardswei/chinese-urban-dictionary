import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import About from './About';
import Home from './Home';
import Entry from './Entry';
import NotFound from './NotFound'
import Navigation from './Navigation'
import './App.css';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route path="/about" exact component={About}/>
            <Route path="/" exact component={Home}/>
            <Route path="/api/entries/:id" exact component={Entry}/>
            <Route component={NotFound} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
