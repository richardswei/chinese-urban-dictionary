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
	}

	componentDidMount(){
		this.setState(this.props.location.params)
	}

	postDefinition() {
		console.log(this.state.tag_list)
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
		.then(() => {this.props.history.push(`/entries/${defObj.entry_id}`) });
	}

	onChange(e) {
	    if (e.target.id === 'definition') {
        this.setState({ definition: e.target.value });
	    } else if (e.target.id === 'usage') {
        this.setState({ usage: e.target.value });
	    } else if (e.target.id === 'usage_translation') {
        this.setState({ usage_translation: e.target.value});
			} else if (e.target.id === 'tag_list') {
        this.setState({ tag_list: e.target.value});
			}
	 }

	handleSubmit(event) {
		event.preventDefault();
		this.postDefinition()
	}
	render() {
		const defaultValues = {
			definition: this.state.definition,
			usage: this.state.usage,
			usage_translation: this.state.usage_translation,
			tag_list: this.state.tag_list
		}
	  return <Card>
	  					<Card.Header>
	  						<Card.Title as="h1">{this.state.entry_phrase}
	  							<span className="text-muted">({this.state.entry_pinyin})</span>
	  						</Card.Title>
	  						
	  					</Card.Header>

	  					<Card.Body>
								<Form onSubmit={this.handleSubmit}>
								<Form.Group>
								  <Form.Label>Definition</Form.Label>
								  <Form.Control
								  	defaultValue={defaultValues.definition}
								  	onChange={this.onChange}
								  	id='definition'  />
								</Form.Group>
								<Form.Group>
								  <Form.Label>Usage</Form.Label>
								  <Form.Control
								  	as={InputMethodEditor}
								  	ime_off = {this.props.appState.ime_off}
								  	numResults={5}
										ref={this.usageInput}
										inputClass="form-control"
								  	textArea={true}
								  	rows="3"
								  	defaultValue={defaultValues.usage}
								  	onChange={this.onChange} 
								  	id='usage'  />
								</Form.Group>
								<Form.Group>
								  <Form.Label>Usage Translation</Form.Label>
								  <Form.Control
								  	as="textarea" rows="3"
								  	defaultValue={defaultValues.usage_translation}
								  	onChange={this.onChange} 
								  	id='usage_translation'  />
								</Form.Group>
								<Form.Group>
								  <Form.Label>Tags</Form.Label>
								  <Form.Control
								  	defaultValue={defaultValues.tag_list}
								  	onChange={this.onChange} 
								  	id='tag_list'  />
								</Form.Group>
									<Button type='submit' >Save</Button>
								</Form>
	  					</Card.Body>
	  				</Card>
	}
}

export default EditDefinition