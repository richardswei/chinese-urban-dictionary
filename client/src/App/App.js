import React, {Component} from 'react';
import { Form, Container } from 'react-bootstrap';
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { Redirect } from "react-router-dom";

import About from '../About/About.js';
import Home from '../Home/Home.js';
import Entry from '../Entry/Entry.js';
import Tag from '../Entry/Tag.js';
import NotFound from '../NotFound/NotFound.js'
import Navigation from '../Navigation/Navigation.js'
import SearchResults from '../SearchResults/SearchResults.js'
import NewEntry from '../Entry/NewEntry.js'
import Signup from '../Sessions/Signup.js'
import AuthSignIn from '../Sessions/AuthSignIn.js'
import AuthSignOut from '../Sessions/AuthSignOut.js'

import '../App/App.css';

const Api = require('../Api.js');
const imageUrl = '/taipei101.jpg';
const Background = {
  backgroundImage: 'url(' + imageUrl + ')', 
  backgroundSize: 'cover', 
  minHeight: '100vh',
};
const ToggleSwitch = {
  backgroundColor: 'white',
  position: 'fixed',
  bottom: '0px',
  right: '0px',
  padding: ".5rem",
  color: "black",
  borderRadius: "1rem",
}

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
      username: undefined,
      email: undefined,
      jwt: undefined,
      user_id: undefined,
      ime_off: true
    }
  }

  constructor(props) {
    super(props)
    this.state = this.defaultState()
    this.propagateSignIn = this.propagateSignIn.bind(this)
    this.propagateSignOut = this.propagateSignOut.bind(this)
    this.handleIMEToggle = this.handleIMEToggle.bind(this)
  }

  handleIMEToggle(event) {
    console.log(event.target.checked)
    this.setState({
      ime_off: !event.target.checked
    })
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
      username: undefined,
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
          username: response.username,
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
          username: undefined,
          email: undefined,
          user_id: undefined,
          jwt: undefined
        })
      }
    })
  }

  render() {
    const notLoggedIn = !this.props.allCookies["rails-react-token-auth-jwt"]
      return (
      <div style={Background}>
        <Router>
          <Navigation appState={this.state}/>
          <Container>
            <Switch>
              <Route exact path="/about" 
                render={
                  (routeProps) =>
                    <About {...routeProps} appState={this.state}/> 
                } 
              />
              <Route exact path="/" 
                render={
                  (routeProps) =>
                    <Home {...routeProps} appState={this.state}/> 
                } 
              />
              <Route path="/entries/:id" 
                render={
                  (routeProps) =>
                    <Entry {...routeProps} appState={this.state}/> 
                } 
              />
              <Route path="/tag/:id" 
                render={
                  (routeProps) =>
                    <Tag {...routeProps} appState={this.state}/> 
                } 
              />
              <Route path="/searchresults" 
                render={
                  (routeProps) =>
                    <SearchResults {...routeProps} appState={this.state}/> 
                } 
              />
              <Route exact path="/signup" 
                render={
                  (routeProps) => 
                    <Signup {...routeProps} appState={this.state}/> 
                } 
              />
              <Route exact path="/newEntry" 
                render={
                  (routeProps) => notLoggedIn
                    ? <Redirect to={{ pathname: "/sign-in"}} /> 
                      : <NewEntry {...routeProps} appState={this.state}/> 
                  }
              />
              {notLoggedIn &&
                <Route exact path="/sign-in"
                  render={(routeProps) => (
                    <AuthSignIn {...routeProps} propagateSignIn={this.propagateSignIn} />
                  )}
                />
              }

              {!notLoggedIn &&
                <Route exact path="/sign-out"
                  render={(routeProps) => (
                    <AuthSignOut {...routeProps} propagateSignOut={this.propagateSignOut} />
                  )}
                />
              }
              <Route component={NotFound} />

            </Switch>
          </Container>
        </Router>
        <Form style={ToggleSwitch}>
          <Form.Check 
            type="switch"
            id="ime-switch"
            label="Use IME"
            onChange={this.handleIMEToggle}
          />
        </Form>
      </div>
    );
  }
}

export default withCookies(App);
