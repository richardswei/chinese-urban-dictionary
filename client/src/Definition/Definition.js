import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card} from 'react-bootstrap';

class Definition extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const definition={
      updated_at: this.props.updated_at,
      id: this.props.id,
      tags: this.props.tags,
      definition: this.props.definition,
      user: this.props.user,
      usage: this.props.usage,
      usage_translation: this.props.usage_translation,
    }
  	return <div key={definition.id}>
            <Card bg='light'>
              <Card.Header as="h5" >
                <strong>Definition: </strong>{definition.definition} 
              </Card.Header>
              <Card.Body>
                <p><strong>Usage: </strong>{definition.usage}</p>
                <p><strong>Translation: </strong>{definition.usage_translation}</p>
                <div><strong>Tags: </strong>
                  {definition.tags.map((tag_item, e) => {
                    return (<Button
                      as={Link}
                      to={`/tag/${tag_item.id}`}
                      size="sm"
                      variant='dark'
                      key={tag_item.id}>
                      {tag_item.name}
                    </Button>)
                  })}
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="text-muted">
                  Last updated by {definition.user} on {new Date(definition.updated_at).toDateString()}
                </div>
                  { this.props.appState.jwt && 
                    <Button as={Link} to={{ 
                      pathname: `/entries/${this.props.entry.id}/editDefinition/${definition.id}`, 
                    }} >Edit Definition</Button>
                  }
              </Card.Footer>
            </Card>
          </div>
  }
}

export default Definition
