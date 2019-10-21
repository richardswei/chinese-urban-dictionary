import React, {Component} from 'react'
import {Container, Row, Col, Navbar, Nav, NavDropdown, FormControl, Button, Form} from 'react-bootstrap'
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
		console.log(this.props.appState)
	return	<div>
		<Navbar expand="lg" bg="dark" variant="dark">			
			<Container>

			<Navbar.Brand as={Link} to="/">
				<h1 className='brand'>CHANG'S SLANG</h1>
			</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">

					<Nav className="mr-auto">
						<Form inline onSubmit={this.handleSubmit}>
							<FormControl 
							type="text"
							placeholder="Search" 
							className="mr-sm-2" 
							id="search" 
							onChange={this.updateQuery} />
							<Button variant="light" type="submit">Search</Button>
						</Form>
					</Nav>
					<Nav>
						<Nav.Link as={Link} to="/NewEntry">New Entry</Nav.Link>
						<NavDropdown alignRight title="Account" id="collasible-nav-dropdown">
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