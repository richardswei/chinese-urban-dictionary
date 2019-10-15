import React, {Component} from 'react'
import {Image, Navbar, Nav, NavDropdown, FormControl, Button, Form} from 'react-bootstrap'
import { Link, withRouter  } from "react-router-dom";
import Login from '../Sessions/Login.js'
import Signup from '../Sessions/Signup.js'


class Navigation extends Component {

	constructor(props) {
	  super(props);

	  this.handleSubmit = this.handleSubmit.bind(this)
	  this.updateQuery = this.updateQuery.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.history.push({
      pathname: "/searchresults",
      state: {
        query: this.state.query
      }
    });
	}
	
	updateQuery(event) {
		console.log(event.target.value);
	  this.setState({
	    query: event.target.value
	  });
	};

	render() { 
	return	<div>
		<Navbar bg="dark" variant="dark" expand="md">			
		  <Navbar.Brand as={Link} to="/">
		  	<h1 className='brand'>CHANG'S SLANG</h1>
		  </Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse >
				<Nav className="mr-auto"></Nav>
		    <Form inline onSubmit={this.handleSubmit}>
		      <FormControl 
		      	type="text"
		      	placeholder="Search" 
		      	className="mr-sm-2" 
		      	id="search" 
		      	onChange={this.updateQuery} />
		      <Button variant="light" type="submit">Search</Button>
		    </Form>
		    <Button variant='dark' as={Link} to="/Login">Log In</Button>
		    <Button variant='dark' as={Link} to="/Signup">Sign Up</Button>
		    <Button variant='dark' as={Link} to="/NewEntry">New Entry</Button>
			</Navbar.Collapse>
		</Navbar>
	</div>
	}
}

export default withRouter(Navigation)