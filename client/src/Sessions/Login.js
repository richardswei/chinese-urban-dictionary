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
		console.log(this.state);
		return fetch('/api/login', {
			method: 'POST',
			headers: {
			  'content-type': 'application/json'
			},
			dataType: 'json',
			body: JSON.stringify(this.state)
		}).then(response => response.json())
			.then(json => {
				console.log(json);
			});
	}

  render() {
    return (
    	<Jumbotron>
	    	<Container>
	    		<Row>
	    			<Col>
	    				<h5>Log in</h5>
				    	<Form onSubmit={this.handleSubmit}>
				    		<Form.Group>
				    			<Form.Label>Login</Form.Label>
				    			<Form.Control 
				    				onChange={this.handleChange}
				    				id='login'
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