import React, {Component} from 'react'
import {Image, Navbar, Nav, NavDropdown, FormControl, Button, Form} from 'react-bootstrap'
import { Link } from "react-router-dom";

class Navigation extends Component {
	render () { 
	return	<div>
		<Navbar bg="dark" variant="dark" expand="md">			
		  <Navbar.Brand as={Link} to="/">
		  	<h1>CHANG'S SLANG</h1>
		  </Navbar.Brand>
			<Navbar.Collapse >
				<Nav className="mr-auto"></Nav>
		    <Form inline>
		      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
		      <Button variant="light" as={Link} to="search">Search</Button>
		    </Form>
		    <Button variant='dark' as={Link} to="/">Sign Up</Button>
		    <Button variant='dark' as={Link} to="About">Log In</Button>
			</Navbar.Collapse>
		</Navbar>
		<Navbar bg="dark" variant="dark" expand="md">
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
			  <Nav className="mr-auto">
			    <Button variant='dark' as={Link} to="/">Home</Button>
			    <Button variant='dark' as={Link} to="About">About</Button>
			    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
			      <NavDropdown.Item as={Link} to="action1">Action</NavDropdown.Item>
			      <NavDropdown.Item as={Link} to="action2">Another action</NavDropdown.Item>
			      <NavDropdown.Item as={Link} to="action3">Something</NavDropdown.Item>
			      <NavDropdown.Divider />
			      <NavDropdown.Item as={Link} to="action4">Separated link</NavDropdown.Item>
			    </NavDropdown>
			  </Nav>
			</Navbar.Collapse>
		</Navbar>
	</div>
	}
}

export default Navigation