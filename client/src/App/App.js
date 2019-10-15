import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import About from '../About/About.js';
import Home from '../Home/Home.js';
import Entry from '../Entry/Entry.js';
import NotFound from '../NotFound/NotFound.js'
import Navigation from '../Navigation/Navigation.js'
import SearchResults from '../SearchResults/SearchResults.js'
import NewEntry from '../Entry/NewEntry.js'
import Login from '../Sessions/Login.js'
import Signup from '../Sessions/Signup.js'
import '../App/App.css';

const Background = {
  backgroundSize: 'cover', 
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',

};

class App extends Component {
  render() {
    return (
      
      <div style={{backgroundColor: 'pink'}}>
        <Router>
          <Navigation />
          <Container style={Background}>
            <Switch>
              <Route path="/about" exact component={About}/>
              <Route path="/" exact component={Home}/>
              <Route path="/entries/:id" exact component={Entry}/>
              <Route path="/searchresults" exact component={SearchResults}/>
              <Route path="/newEntry" exact component={NewEntry}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/signup" exact component={Signup}/>
              <Route component={NotFound} />

            </Switch>
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
