import React, {Component} from 'react';
import {Jumbotron, Container, Row, Col,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const headerAdStyle = {
  opacity: 0.4,
  color: 'white'
};

class Home extends Component {
  constructor() {
      super();
      this.state = {};
      this.getTrending = this.getTrending.bind(this);
    }

  componentDidMount() {
    this.getTrending();
  }

  getTrending() {
    this.fetch('/api/entries/get_trending')
      .then(entries => {
        this.setState({entries: entries.map((entry) => {
          return {id: entry.id, phrase: entry.phrase} 
        })})
      });
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  render() {
    const date = new Date().toLocaleDateString();
    let entries = this.state.entries;
  	return (
      <div>
        <Jumbotron style={headerAdStyle}>
          <h1>Whoa Taiwan, dude... Taiwan numba 1</h1>
        </Jumbotron>
        <Container>
          <Row>
            <Col xs={12} md={8}>
                <Jumbotron fluid>
                  <h4>Trending: {date}</h4>
                  <br/>
                  <div className='trending'>
                    {entries && entries.length 
                      ? <ol>
                        <Container>
                          <Row>
                            <Col>
                               {entries.map((entry, i) => {
                                 return i<5 && <li key={entry.id}>
                                  <Link to={`/entries/${entry.id}`}>
                                    {entry.phrase}
                                  </Link>
                                 </li>
                               })}
                            </Col>
                            <Col>
                           {entries.map((entry, i) => {
                             return i>=5 && <li key={entry.id}>
                              <Link to={`/entries/${entry.id}`}>
                                {entry.phrase}
                              </Link>
                             </li>
                           })}
                            </Col>
                          </Row>
                        </Container>
                      </ol>
                    : <div></div>}
                  </div>
                </Jumbotron>
            </Col>
            <Col xs={6} md={4}>
              <Image src="logo512.png" fluid />
            </Col>
          </Row>
        </Container>
      </div>

  	)
  }
}

export default Home


// /api/entries/get_trending