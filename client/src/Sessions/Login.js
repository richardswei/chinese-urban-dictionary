import React, {Component} from 'react';
import {Jumbotron, Form, Button, Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {};
	}

	handleChange(event) {
		this.setState({
		  [event.target.id]: event.target.value,
		});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		const login = {auth: this.state	}
		return fetch('/user_token', {
			method: 'POST',
			headers: {
			  'content-type': 'application/json'
			},
			dataType: 'json',
			body: JSON.stringify(login)
		}).then(response => {
			response.json()
		})
			.then(json => {
				console.log(json);
			});
	}

  render() {
    return (
    	<Jumbotron>
	    	<Container>
  				<h5>Log in</h5>
	    		<Row>
	    			<Col>
				    	<Form onSubmit={this.handleSubmit}>
				    		<Form.Group>
				    			<Form.Label>Email</Form.Label>
				    			<Form.Control 
				    				onChange={this.handleChange}
				    				id='email'
				    			/>
				    			<Form.Text className="text-muted">
									</Form.Text>
								</Form.Group>
				    		<Form.Group>
				    			<Form.Label>Password</Form.Label>
				    			<Form.Control 
				    				onChange={this.handleChange}
				    				id='password'
				    			/>
				    			<Form.Text className="text-muted">
									</Form.Text>
								</Form.Group>
								<Button type="submit">Log In</Button>
								<br/>
								<Link to={'/'}>Forgot Password?</Link>
				    	</Form>
	    			</Col>
	    			<Col style={{textAlign: "center"}}>
	    				<h5>Sign up for a new account!</h5>
	    				<Button as={Link} to={'/signup'}>New Account</Button>
	    			</Col>
	    		</Row>
	    	</Container>
    	</Jumbotron>
    )
  }
}

export default Login