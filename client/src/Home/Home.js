import React, {Component} from 'react';
import { Card, CardColumns, Jumbotron, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const headerAdStyle = {
  textAlign: 'center'
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
          return {
            id: entry.id,
            pinyin: entry.pinyin,
            phrase: entry.phrase,
            definition: entry.definitions[0]? entry.definitions[0].definition : '[no definitions]'
          }
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
          <h2>
            "TEACHERS HATE HIM!!! LEARN MANDARIN IN 3 EASY STEPS"
            <br/>
            <Link>CLICK HERE! (this goes nowhere)</Link>
          </h2>
        </Jumbotron>
        <Container>
          <Row>
            <Col >
                <Jumbotron fluid>
                  <h3>TRENDING TODAY :  {date}</h3>
                  <br/>
                  <div className='trending'>
                    {entries && entries.length 
                      ? <CardColumns>
                        {entries.map((entry, i) => {
                          return <Card 
                            className="cardLink"
                            bg="dark" 
                            text="white" 
                            key={entry.id}
                            as={Link}
                            to={`/entries/${entry.id}`}>
                            <Card.Header as="h4">
                              {entry.phrase}
                            </Card.Header>
                            <Card.Body>
                              <Card.Subtitle>
                                ( {entry.pinyin} )
                              </Card.Subtitle>
                              <Card.Text>
                                {entry.definition}
                              </Card.Text>
                            </Card.Body>
                           </Card>
                         })}
                        </CardColumns>
                      : <div></div>}
                  </div>
                </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Home


// /api/entries/get_trending