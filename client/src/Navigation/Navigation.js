import React, {Component} from 'react'
import {Image, Navbar, Nav, NavDropdown, FormControl, Button, Form} from 'react-bootstrap'
import { Link, withRouter  } from "react-router-dom";


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
				{!this.props.appState.jwt &&
					<div>
						<Button variant='dark' as={Link} to="/sign-in">Log In</Button>
						<Button variant='dark' as={Link} to="/Signup">Sign Up</Button>
					</div>
				}

				{this.props.appState.jwt &&
					<div>
						<div>Signed in as</div>
						<Button variant='dark' as={Link} to="/sign-out">Sign Out</Button>
		    		<Button variant='dark' as={Link} to="/NewEntry">New Entry</Button>
					</div>
				}
			</Navbar.Collapse>
		</Navbar>
	</div>
	}
}

export default withRouter(Navigation)