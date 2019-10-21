import React, {Component} from 'react';
import {Form, Jumbotron, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Tag extends Component {
	constructor(props) {
		super(props);
		this.state={};
    this.getDefinitions = this.getDefinitions.bind(this);
    this.getTag = this.getTag.bind(this);
	}
	componentDidMount() {
		console.log(this.props.match.params.id)
		// /api/tags/:id/get_relevant_definitions
    this.getDefinitions(this.props.match.params.id)
    this.getTag(this.props.match.params.id)
  }

  getDefinitions(tag_id) {
    return fetch(`/api/tags/${tag_id}/get_relevant_definitions`)
      .then(response => response.json())
      .then(json => {
        this.setState({definitions: json})
        console.log(json)
      })
      .catch(error => console.log(error))
  }

  getTag(tag_id) {
    return fetch(`/api/tags/${tag_id}`)
      .then(response => response.json())
      .then(json => {
        this.setState({tag: json.name})
        console.log(json.name)
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
                key={definition.id}
                as={Link}
                to={`/entries/${definition.entry_id}`}>
                <strong>{definition.entry.phrase} ({definition.entry.pinyin})</strong> {definition.definition}
              </Card>)
            })}
          </div>)
        : <div>Loading</div>
  	)
  }
}

export default Tag