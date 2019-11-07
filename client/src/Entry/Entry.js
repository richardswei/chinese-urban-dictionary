import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, ButtonToolbar, Jumbotron, Card} from 'react-bootstrap';
import Definition from '../Definition/Definition';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      definitionStateProps: [],
      entry: []
    };
    this.getEntry = this.getEntry.bind(this);
    this.getDefinitions = this.getDefinitions.bind(this);
    this.getTags = this.getTags.bind(this);
    this.destroyDefinition = this.destroyDefinition.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.getEntry(this.props.match.params.id);
    this.getDefinitions(this.props.match.params.id);
  }

  getEntry(id) {
    return fetch(`/api/entries/${id}`)
      .then(response => response.json())
      .then(entry => {
        this.setState({entry: entry});
      })
      .catch(error => console.log(error));
  }

  getDefinitions(entry_id) {
    return fetch(`/api/entries/${entry_id}/definitions`)
      .then(response => response.json())
      .then(definitions => {
        definitions.forEach(definition => {
          this.setState({ [`definition-${definition.id}`]: definition});
          this.getTags(entry_id, definition.id);
          this.setState({definitionStateProps: this.state.definitionStateProps
              .concat([`definition-${definition.id}`])});
        });
      })
      .catch(error => console.log(error));
  }
  
  getTags(entry_id, definition_id) {
    return fetch(`/api/entries/${entry_id}/definitions/${definition_id}/get_tags`)
      .then(response => response.json())
      .then(tag_obj => {
        this.setState({
          [`definition-${definition_id}`]: 
            Object.assign(this.state[`definition-${definition_id}`], {tags: tag_obj}) 
        });
      })
      .catch(error => console.log(error));
  }

  destroyDefinition(entry_id, definition_id) {
    return fetch(`/api/entries/${entry_id}/definitions/${definition_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + this.props.appState.jwt
      },
    })
    .then(response => response.json())
    .then(this.props.history.go(0));
  }

  updateState() {
    this.setState({dataStatus: 'Data updated...'})
  }


  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }
  

  render() {
    const entry = this.state.entry;
    const definitions = this.state.definitionStateProps
      .map((def, i) => this.state[def] );
    const linkTo = { 
      pathname: `/entries/${entry.id}/newDefinition/`, 
    };
  	return (<div>
        { entry ? <Jumbotron>
          <h1>{entry.phrase}</h1>
          <h3>{entry.pinyin}</h3>
          <div>{entry.view_count} Views</div>
          { this.props.appState.jwt && 
            <Button as={Link} to={linkTo} >New Definition</Button>
          }
          <div className="text-muted">Created on {new Date(entry.updated_at).toDateString()}</div>
        </Jumbotron> : <div></div>}
        {definitions && definitions.length ? 
          definitions.map((def, i) => {
            return def.tags && <Definition key={i}
              entry={entry}
              updated_at = {def.updated_at}
              id = {def.id}
              tags = {def.tags}
              definition = {def.definition}
              user = {def.user.username}
              usage = {def.usage}
              usage_translation = {def.usage_translation}
              appState = {this.props.appState}
            >
            </Definition>
          }) : <div></div> }
    </div>)
  }
}

export default Entry
