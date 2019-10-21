import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Jumbotron, Card} from 'react-bootstrap';
import DefinitionForm from '../Definition/DefinitionForm';

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
    this.fetch(`/api/entries/${id}`)
      .then(entry => {
        this.setState({entry: entry});
      });
  }

  getDefinitions(entry_id) {
    this.fetch(`/api/entries/${entry_id}/definitions`)
      .then(definitions => {
        definitions.forEach(definition => {
          this.setState({ [`definition-${definition.id}`]: definition});
          this.getTags(entry_id, definition.id);
          this.setState({definitionStateProps: this.state.definitionStateProps
              .concat([`definition-${definition.id}`])});
        });
      });
  }
  
  getTags(entry_id, definition_id) {
    this.fetch(`/api/entries/${entry_id}/definitions/${definition_id}/get_tags`)
      .then(tag_obj => {
        this.setState({
          [`definition-${definition_id}`]: 
            Object.assign(this.state[`definition-${definition_id}`], {tags: tag_obj}) 
        });
      });
  }

  destroyDefinition(entry_id, definition_id) {
    return fetch(`/api/entries/${entry_id}/definitions/${definition_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + this.props.appState.jwt
      },
    })
    .then(response => response.json());
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
    console.log(this.state)
    const entry = this.state.entry;
    const definitions = this.state.definitionStateProps
      .map((def, i) => this.state[def] );
  	return (<div>
        {
          entry ? <Jumbotron>
            <h1>{entry.phrase}</h1>
            <h3>{entry.pinyin}</h3>
            <div>{entry.view_count}</div>
            <div>{entry.updated_at}</div>
            { this.props.appState.jwt && 
              <DefinitionForm 
                buttonText="Add Definition"
                entryID={entry.id}
                auth={this.props.appState.jwt}
              ></DefinitionForm>
            }
          </Jumbotron> : 
          <div></div>}
        <div>
        {
          definitions && definitions.length ? 
            definitions.map((def, i) => {
              return (
                def.tags ? 
                  <div key={i}>
                    <Jumbotron>
                      <div><strong>Definition:</strong> {def.definition}</div>
                      <br/>
                      <div>Usage: {def.usage}</div>
                      <div>Translation: {def.usage_translation}</div>
                      <div>Tags: 
                        {
                          def.tags.map((tag_item, e) => {
                            console.log(tag_item)
                            return (<Button 
                              as={Link}
                              to={`/tag/${tag_item.id}`}
                              size="sm" 
                              key={tag_item.name}>
                              {tag_item.name}
                            </Button>)
                          }) 
                        }
                      </div>
                      {def.user_id === this.props.appState.user_id ?
                        (<div>
                          <DefinitionForm
                            updateState={this.updateState}
                            buttonText="Edit Definition"
                            defaultDefinition={def.definition}
                            defaultTagList={def.tags.map((tag_item) => tag_item.name ).join(', ') }
                            defaultUsage={def.usage}
                            defaultUsageTranslation={def.usage_translation}
                            entryID={def.entry_id}
                            definitionID={def.id}
                            auth={this.props.appState.jwt}
                          ></DefinitionForm>
                          <Button size="sm" onClick={() => {this.destroyDefinition(def.entry_id, def.id)}} >Delete Definition</Button>
                        </div> ) : ``}
                    </Jumbotron>
                    <br/>
                  </div> : ''
              );
            }) : <div></div>         
        }
        </div>
    </div>)
  }
}

export default Entry
