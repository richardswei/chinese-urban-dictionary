import React, {Component} from 'react';
import {Modal, Button, ButtonToolbar, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class DefinitionModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
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

	postDefinition = () => {
		const obj = {
			definition: this.state.definition,
			usage: this.state.usage,
			usage_translation: this.state.usage_translation,
			entry_id: this.props.entry_id,
			tag_list: this.state.tag_list
		};
		
		return fetch(`/api/entries/${this.props.entry_id}/definitions/${this.props.definition_id ? this.props.definition_id : ''}`,{
					method: this.props.definition_id ? 'PUT' : 'POST',
					headers: {
					  'content-type': 'application/json'
					},
					dataType: 'json',
					body: JSON.stringify(obj)
		})
		.then(response => response.json())
		.then(json => {console.log(json)});
	}

	onChange(e) {
      // console.log(this.state);
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

	render() {
	  return (
	    <Modal
	      {...this.props}
	      size="lg"
	      aria-labelledby="contained-modal-title-vcenter"
	      centered
	    >
	      <Modal.Header closeButton>
	        <Modal.Title id="contained-modal-title-vcenter">
	          Modal heading
	        </Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	        <h4>Definition</h4>
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
	            	as="textarea" rows="3"
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
	        <Button onClick={() => {this.postDefinition(); this.props.onHide()}} >Save</Button>
	      </Modal.Footer>
	    </Modal>
	  );
	}
}

function DefinitionForm(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <ButtonToolbar>
      <Button size="sm" variant="primary" onClick={() => setModalShow(true)}>
        {props.buttonText}
      </Button>

      <DefinitionModal
      	entry_id={props.entryID}
      	definition_id={props.definitionID}
      	default_definition={props.defaultDefinition}
      	default_usage={props.defaultUsage}
      	default_translation={props.defaultUsageTranslation}
      	default_tags={props.defaultTagList}
        show={modalShow}
        onHide={() => setModalShow(false)}
        // onSave={() => saveDefinition(props.entryID, props.definitionID)}
      />
    </ButtonToolbar>
  );
}



export default DefinitionForm;
