import React, {Component} from 'react';
import { Button, Form, Card} from 'react-bootstrap'
import InputMethodEditor from '../InputMethodEditor'

class EditDefinition extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
		this.postDefinition = this.postDefinition.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.usageInput = React.createRef();
		this.getDefinition = this.getDefinition.bind(this);
		this.getEntry = this.getEntry.bind(this);
	}

	componentDidMount(){
		if (this.props.match.params.id) {
			this.getDefinition(this.props.match.params.entry_id,this.props.match.params.id)
		} else {
			this.getEntry(this.props.match.params.entry_id);
		}
	}

	getEntry(id) {
	  return fetch(`/api/entries/${id}`)
	    .then(response => response.json())
	    .then(entry => {
	      this.setState({
	      	entry_id: entry.id,
	      	entry_phrase: entry.phrase, 
	      	entry_pinyin: entry.pinyin,
	      	definition: '',
	      	usage: '',
	      	usage_translation: '',
	      	tag_list: '',
	      });
	    })
	    .catch(error => console.log(error));
	}

	getDefinition(entry_id, definition_id) {
	  return fetch(`/api/entries/${entry_id}/definitions/${definition_id}/get_definition`)
	    .then(response => response.json())
	    .then(definition => {
	    	const tag_list = definition.tags.map(tag => tag.name).join(', ')
	    	console.log(definition)
        this.setState({
        	id: definition.id,
        	entry_id: definition.entry_id,
					entry_phrase: definition.entry.phrase,
					entry_pinyin: definition.entry.pinyin,
					definition: definition.definition,
					usage: definition.usage,
					usage_translation: definition.usage_translation,
					tag_list: tag_list,
        });
	    })
	    .catch(error => console.log(error));
	}


	postDefinition() {
		const defObj = {
			entry_id: this.state.entry_id,
			definition: this.state.definition,
			usage: this.usageInput.current.state.inputText,
			usage_translation: this.state.usage_translation,
			tag_list: this.state.tag_list
		};

		if (!defObj.definition) {
			return alert("Definition cannot be empty!")
		} else if (!defObj.usage) {
			return alert("Usage cannot be empty!")
		} 
		else if (!defObj.usage_translation) {
			return alert("Usage Translation cannot be empty!")
		} 
		return fetch(`/api/entries/${this.state.entry_id}/definitions/${this.state.id ? this.state.id : ''}`,{
					method: this.state.id ? 'PUT' : 'POST',
					headers: {
					  'content-type': 'application/json',
					  'authorization': 'Bearer ' + this.props.appState.jwt
					},
					dataType: 'json',
					body: JSON.stringify(defObj)
		})
		.then(response => response.json())
		.then(json => { console.log(json) })
		.catch(error => {console.log(error)})
		.then(() => {this.props.history.goBack() });
	}

	onChange(event) {
		event.preventDefault();
		if (event.target.id === 'definition') {
		  this.setState({ definition: event.target.value });
		} else if (event.target.id === 'usage') {
		  this.setState({ usage: event.target.value });
		} else if (event.target.id === 'usage_translation') {
		  this.setState({ usage_translation: event.target.value});
		} else if (event.target.id === 'tag_list') {
		  this.setState({ tag_list: event.target.value});
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.postDefinition()
	}
	render() {
		const definition = this.state;
	  return <Card>
	  	  					<Card.Header>
	  	  						<Card.Title as="h1">{definition.entry_phrase}
	  	  							<span className="text-muted">({definition.entry_pinyin})</span>
	  	  						</Card.Title>
	  	  					</Card.Header>
	  	  					<Card.Body>
	  								<Form onSubmit={this.handleSubmit}>
	  								{definition.definition!==undefined && <Form.Group>
	  								  <Form.Label>Definition</Form.Label>
	  								  <Form.Control
	  								  	as="textarea"
	  								  	defaultValue={definition.definition}
	  								  	onChange={this.onChange}
	  								  	id='definition'  />
	  								</Form.Group>}
	  								{definition.usage!==undefined && <Form.Group>
	  								  <Form.Label>Usage</Form.Label>
	  								  <Form.Control
	  								  	as={InputMethodEditor}
	  								  	ime_off = {this.props.appState.ime_off}
	  								  	numResults={5}
	  										ref={this.usageInput}
	  										inputClass="form-control"
	  								  	textArea={true}
	  								  	rows="3"
	  								  	defaultValue={definition.usage}
	  								  	onChange={this.onChange} 
	  								  	id='usage'  />
	  								</Form.Group>}
	  								{definition.usage_translation!==undefined && <Form.Group>
	  								  <Form.Label>Usage Translation</Form.Label>
	  								  <Form.Control
	  								  	as="textarea"
	  								  	rows="3"
	  								  	defaultValue={definition.usage_translation}
	  								  	onChange={this.onChange} 
	  								  	id='usage_translation'  />
	  								</Form.Group>}
	  								{definition.usage_translation!==undefined && <Form.Group>
	  								  <Form.Label>Tags</Form.Label>
	  								  <Form.Control
	  								  	defaultValue={definition.tag_list}
	  								  	onChange={this.onChange} 
	  								  	id='tag_list' />
	  								</Form.Group>}
	  									<Button type='submit' >Save</Button>
	  								</Form>
	  	  					</Card.Body>
	  	  				</Card>
	}
}

export default EditDefinition