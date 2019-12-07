import React, {Component} from 'react';
import {Jumbotron, Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';

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
      const login = {user: this.state} 
      return fetch('/users/create', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          dataType: 'json',
          body: JSON.stringify(login)
      }).then(response => {
        if (response.status===200) {
          this.props.history.push('/');
          return;
        } else {
          return response.json();
        }
      }).then(json => {
        this.setState({
          errors: json.msg
        })
      }).catch(error => {
        console.log(error)
      });
  }      

  render() {
    return (
        <Jumbotron>
          <h5>Sign up for a free new account!</h5>
          {this.state.errors && <Alert variant="danger">
            <strong>Please correct the following errors:</strong>
            <br />
            {this.state.errors.map((message, i) => <p key={`${i}error`}>- {message}</p>)}
          </Alert>}
          <Container>
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={this.handleChange} 
                      type="email" 
                      id='email'/>
                    <Form.Text className="text-muted">
                      Your email will never be shared with anyone. 
                    </Form.Text>
                    </Form.Group>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={this.handleChange} 
                      id='username'/>
                    <Form.Text className="text-muted">
                      This is the name that will be displayed to other users.
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
                      id='password_confirmation'/>
                    <Form.Text className="text-muted">
                      Passwords must match!
                    </Form.Text>
                  </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
              </Col>
              </Row>  
          </Container>
        </Jumbotron>
    )
  }
}

export default Signup