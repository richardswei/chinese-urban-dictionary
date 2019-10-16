import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

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
import AuthSignIn from './AuthSignIn.js'
import AuthSignOut from './AuthSignOut.js'

import '../App/App.css';

const Api = require('../lib/Api.js');

const Background = {
  backgroundSize: 'cover', 
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
};

class App extends Component {
  
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  componentDidMount() {
    this.getUser();
  }

  defaultState() {
    return {
      cookieName: 'rails-react-token-auth-jwt',
      email: undefined,
      jwt: undefined,
      user_id: undefined,
    }
  }


  constructor(props) {
    super(props)

    this.state = this.defaultState()

    this.propagateSignIn = this.propagateSignIn.bind(this)
    this.propagateSignOut = this.propagateSignOut.bind(this)
  }

  propagateSignIn(jwt, history = undefined) {
    const { cookies } = this.props
    cookies.set(this.state.cookieName, jwt, { path: '/' })
    this.getUser(history)
  }

  propagateSignOut(history = undefined) {
    const { cookies } = this.props
    cookies.remove(this.state.cookieName)
    this.setState({
      email: undefined,
      user_id: undefined,
      jwt: undefined
    })
    if (history) history.push('/')
  }


  
  getUser(history = undefined) {
    const { cookies } = this.props
    let jwt = cookies.get(this.state.cookieName)
    if (!jwt) return null

    Api.getCurrentUser(jwt).then(response => {
      if (response !== undefined) {
        this.setState({
          email: response.email,
          user_id: response.id,
          jwt: jwt
        })
        if (history) history.push('/')
      }
      else {
        // user has cookie but cannot load current user
        cookies.remove(this.state.cookieName)
        this.setState({
          email: undefined,
          user_id: undefined,
          jwt: undefined
        })
      }
    })
  }

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
              {!this.state.jwt &&
                <Route
                  exact path="/sign-in"
                  render={(routeProps) => (
                    <AuthSignIn {...routeProps} propagateSignIn={this.propagateSignIn} />
                  )}
                />
              }

              {this.state.jwt &&
                <Route
                  exact path="/sign-out"
                  render={(routeProps) => (
                    <AuthSignOut {...routeProps} propagateSignOut={this.propagateSignOut} />
                  )}
                />
              }

            </Switch>
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
