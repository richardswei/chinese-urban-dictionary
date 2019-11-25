import React, {Component} from 'react';
import {Jumbotron, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state={};
    this.getDefinitions = this.getDefinitions.bind(this);
    this.getTag = this.getTag.bind(this);
  }
  componentDidMount() {
    this.getDefinitions(this.props.match.params.id)
    this.getTag(this.props.match.params.id)
  }

  getDefinitions(tag_id) {
    return fetch(`/api/tags/${tag_id}/get_relevant_definitions`)
      .then(response => response.json())
      .then(json => {
        this.setState({definitions: json})
      })
      .catch(error => console.log(error))
  }

  getTag(tag_id) {
    return fetch(`/api/tags/${tag_id}`)
      .then(response => response.json())
      .then(json => {
        this.setState({tag: json.name})
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      this.state.definitions && this.state.tag ?
        (<div>
            <Jumbotron>
              <h2>Entries associated with tag: <strong>{this.state.tag}</strong></h2>
            </Jumbotron>
            {this.state.definitions.map((definition) => {
              return (<Card 
                  bg='light'
                  text='dark'
                  className='cardLink'
                  style={{ width: '50vw' }} 
                  key={definition.id}
                  as={Link}
                  to={`/entries/${definition.entry_id}`}>
                  
                <Card.Body>
                  <Card.Title>{definition.entry.phrase} </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">({definition.entry.pinyin})</Card.Subtitle>
                  <Card.Text>Definition:  {definition.definition}</Card.Text>
                 
                </Card.Body>

              </Card>)
            })}
          </div>)
        : <div>Loading</div>
    )
  }
}

export default Tag