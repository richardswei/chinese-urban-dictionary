import React, {Component} from 'react';
import {Modal, Button, ButtonToolbar, Form} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import InputMethodEditor from '../InputMethodEditor'


class DefinitionModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
		this.postDefinition = this.postDefinition.bind(this);
		this.onSave = this.onSave.bind(this);
		this.usageInput = React.createRef();
	}

	componentDidMount(){
		this.setState({
			definition: this.props.default_definition,
			usage: this.props.default_usage,
			usage_translation: this.props.default_translation,
			entry_id: this.props.entry_id,
			tag_list: this.props.default_tags,
		});
	}

	postDefinition() {
		const defObj = {
			definition: this.state.definition,
			usage: this.usageInput.current.state.inputText,
			usage_translation: this.state.usage_translation,
			entry_id: this.props.entry_id,
			tag_list: this.state.tag_list
		};
		return fetch(`/api/entries/${this.props.entry_id}/definitions/${this.props.definition_id ? this.props.definition_id : ''}`,{
					method: this.props.definition_id ? 'PUT' : 'POST',
					headers: {
					  'content-type': 'application/json',
					  'authorization': 'Bearer ' + this.props.auth
					},
					dataType: 'json',
					body: JSON.stringify(defObj)
		})
		.then(response => response.json())
		.then(json => { console.log(json) })
		.then(() => {this.props.history.go(0) });
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

	 onSave() {
	 	this.postDefinition();
	 	this.props.onHide();
	 	// this.props.updateparent();
	 }

	render() {
    const { to, match, location, history, staticContext, ...rest } = this.props;
	  return (
	    <Modal
	      {...rest}
	      size="lg"
	      aria-labelledby="contained-modal-title-vcenter"
	      centered
	    >
	      <Modal.Header closeButton>
	        <Modal.Title id="contained-modal-title-vcenter">
	      	  <h4>Definition Editor</h4>
	        </Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	        <Form>
	          <Form.Group>
	            <Form.Label>Definition</Form.Label>
	            <Form.Control
	            	defaultValue={this.props.default_definition}
	            	onChange={this.onChange}
	            	id='definition'  />
	          </Form.Group>
	          <Form.Group>
	            <Form.Label>Usage</Form.Label>
	            <Form.Control
	            	as={InputMethodEditor}
	  						ref={this.usageInput}
	  						inputClass="form-control"
	            	textArea={true}
	            	rows="3"
	            	defaultValue={this.props.default_usage}
	            	onChange={this.onChange} 
	            	id='usage'  />
	          </Form.Group>
	          <Form.Group>
	            <Form.Label>Usage Translation</Form.Label>
	            <Form.Control
	            	as="textarea" rows="3"
	            	defaultValue={this.props.default_translation}
	            	onChange={this.onChange} 
	            	id='usage_translation'  />
	          </Form.Group>
	          <Form.Group>
	            <Form.Label>Tags</Form.Label>
	            <Form.Control
	            	defaultValue={this.props.default_tags}
	            	onChange={this.onChange} 
	            	id='tag_list'  />
	          </Form.Group>
	        </Form>
	      </Modal.Body>
	      <Modal.Footer>
	        <Button onClick={this.props.onHide}>Close</Button>
	        <Button onClick={this.onSave} >Save</Button>
	      </Modal.Footer>
	    </Modal>
	  );
	}
}

const DefinitionModalWithRouter = withRouter(DefinitionModal);
function DefinitionForm(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div>
      <Button size="sm" variant="warning" onClick={() => setModalShow(true)}>
        {props.buttonText}
      </Button>
      <DefinitionModalWithRouter
      	entry_id={props.entryID}
      	definition_id={props.definitionID}
      	default_definition={props.defaultDefinition}
      	default_usage={props.defaultUsage}
      	default_translation={props.defaultUsageTranslation}
      	default_tags={props.defaultTagList}
        show={modalShow}
        onHide={() => setModalShow(false)}
        auth={props.auth}
      />
    </div>
  );
}



export default withRouter(DefinitionForm);
