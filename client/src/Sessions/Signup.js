import React, {Component} from 'react';
import {Jumbotron, Form, Button} from 'react-bootstrap';

class Signup extends Component {
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
			return fetch('/api/signup', {
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
						<h5>Sign up for a free new account!</h5>
						<Form onSubmit={this.handleSubmit}>
								<Form.Group>
										<Form.Label>Email</Form.Label>
										<Form.Control onChange={this.handleChange} 
											type="email" 
											id='email'/>
										<Form.Text className="text-muted">

										</Form.Text>
										</Form.Group>
								<Form.Group>
										<Form.Label>Username</Form.Label>
										<Form.Control onChange={this.handleChange} 
											id='username'/>

										<Form.Text className="text-muted">
										
										</Form.Text>
										</Form.Group>
								<Form.Group>
										<Form.Label>Password</Form.Label>
										<Form.Control onChange={this.handleChange}  
											type="password" 
											id='password'/>
										<Form.Text className="text-muted">
										
										</Form.Text>
										</Form.Group>
								<Form.Group>
										<Form.Label>Password Confirmation</Form.Label>
										<Form.Control onChange={this.handleChange}  
											type="password" 
											id='password-formation'/>
										<Form.Text className="text-muted">
										
										</Form.Text>
										</Form.Group>
										<Button type="submit">Submit</Button>
						</Form>
				</Jumbotron>
		)
	}
}

export default Signup