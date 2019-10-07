import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Container, Row, Col, Button} from 'react-bootstrap'


class NotFound extends Component {
  render () {
    return  <div style={{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        height: '50vh',
      }}>
      <Container>
        <Row className="justify-content-md-center">
          <Col sm="12" md="auto">
            <h1>404: Not found</h1>
          </Col>
        </Row>
        <Row >
          <Col>
          </Col>
          <Col xs={6}>
            <p>The page you were looking for doesn't exist.
            You may have mistyped the address or the page may have moved.
            </p>
          </Col>
          <Col>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button as={Link} to='/'>Back to home</Button>
          </Col>
        </Row>
      </Container>
    </div>
  }
}

export default NotFound