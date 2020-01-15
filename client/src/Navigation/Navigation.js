import React, {Component} from 'react'
import {Container, Navbar, Nav, NavDropdown, FormControl, Button, Form} from 'react-bootstrap'
import { Link, withRouter  } from "react-router-dom";
import InputMethodEditor from '../InputMethodEditor'

class Navigation extends Component {

  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push({
      pathname: `/search/${this.searchInput.current.state.inputText}`,
      state: {
        query: this.searchInput.current.state.inputText
      }
    });
  }

  render() { 
    return  <div>
    <Navbar expand="lg" bg="dark" variant="dark">     
      <Container>

      <Navbar.Brand as={Link} to="/">
        <h1 className='brand'>CHANG'S SLANG</h1>
        <div className='brand' style={{'fontSize':'1rem'}}>The Chinese Urban Dictionary</div>
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="mr-auto">
            <Form inline onSubmit={this.handleSubmit}>
              <FormControl
                as={InputMethodEditor}
                ime_off = {this.props.appState.ime_off}
                numResults={5}
                type="text"
                placeholder="Search" 
                className="mr-sm-2" 
                inputClass="form-control"
                id="search"
                ref={this.searchInput}
              />
              <Button variant="light" type="submit">Search</Button>
            </Form>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/NewEntry">New Entry</Nav.Link>
            <NavDropdown alignRight title={"Account"} id="collasible-nav-dropdown">
              {!this.props.appState.jwt &&
                <div>
                  <NavDropdown.Item as={Link} to="/sign-in">Log In</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Signup">Sign Up</NavDropdown.Item>
                </div>
              }

              {
                this.props.appState.jwt &&
                <div>
                  <NavDropdown.Header>Signed in as:
                    <strong> {this.props.appState.username}</strong>
                  </NavDropdown.Header>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/sign-out">Sign Out</NavDropdown.Item>
                </div>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Container>      
    </Navbar>
    </div>
  }
}

export default withRouter(Navigation)