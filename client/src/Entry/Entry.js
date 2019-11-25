import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Jumbotron} from 'react-bootstrap';
import Definition from '../Definition/Definition';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      definitionStateProps: [],
      entry: []
    };
    this.getEntry = this.getEntry.bind(this);
    this.refreshStateOnDelete = this.refreshStateOnDelete.bind(this);
  }

  refreshStateOnDelete() {
    this.getEntry(this.props.match.params.id);
  }

  componentDidMount() {
    this.getEntry(this.props.match.params.id);
  }

  getEntry(id) {
    return fetch(`/api/entries/${id}/get_entries_with_definitions`)
      .then(response => response.json())
      .then(entry => {
        console.log(entry)
        this.setState({entry: entry});
      })
      .catch(error => console.log(error));
  }

  fetch(endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }
  
  render() {
    const entry = this.state.entry;
    const linkTo = { 
      pathname: `/entries/${entry.id}/newDefinition/`, 
    };
    return entry ? (<div>
        { <Jumbotron>
          <h1>{entry.phrase}</h1>
          <h3>{entry.pinyin}</h3>
          <div>{entry.view_count} Views</div>
          { this.props.appState.jwt && 
            <Button as={Link} to={linkTo} >New Definition</Button>
          }
          <div className="text-muted">Created on {new Date(entry.updated_at).toDateString()}</div>
        </Jumbotron>}
        {entry.definitions && entry.definitions.length ? 
          entry.definitions.map((def, i) => {
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
              propagateRefresh = {this.refreshStateOnDelete}
            >
            </Definition>
          }) : <div></div> }
    </div>) : <div></div>
  }
}

export default Entry
