import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import About from './About';
import Home from './Home';
import Entry from './Entry';
import NotFound from './NotFound'
import Navigation from './Navigation'
import SearchResults from './SearchResults'
import './App.css';

const Background = {
  // backgroundImage: 'url(taipei101.jpg)',
  backgroundColor: 'gray',
  backgroundSize: 'cover', 
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',

};

class App extends Component {
  render() {
    return (
      <div style={Background}>
        
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route path="/about" exact component={About}/>
            <Route path="/" exact component={Home}/>
            <Route path="/entries/:id" exact component={Entry}/>
            <Route path="/searchresults" exact component={SearchResults}/>
            <Route component={NotFound} />

          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
