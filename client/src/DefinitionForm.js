import React, {Component} from 'react';
import {Modal, Button, ButtonToolbar, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class MyVerticallyCenteredModal extends Component {
	constructor(props) {
		super(props);
		this.definitionInput = React.createRef();
		this.usageInput = React.createRef();
		this.usageTranslationInput = React.createRef();
	}


	componentDidMount(){

	}

	postDefinition = (event) => {
		event.preventDefault();
		fetch(`${this.props.entry_id}/definitions/${this.props.definition_id ? this.props.definition_id : ''}`,{
					method: 'POST',
					headers: {
					  'content-type': 'application/json'
					},
					body: JSON.stringify({
						definition: 'a' /*this.definitionInput.value*/,
						usage: 'a' /*this.usageInput.value*/,
						usage_translation: 'a' /*this.usageTranslationInput.value*/,
					})
		})
		.then(response => response.json())
		.then(json => {console.log(json)});
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
	        <h4>Centered Modal</h4>
	        <Form>
	          <Form.Group controlId="formGroupDefinition">
	            <Form.Label>Definition</Form.Label>
	            <Form.Control defaultValue={this.props.default_definition} ref={this.definitionInput}  />
	          </Form.Group>
	          <Form.Group controlId="formGroupUsage">
	            <Form.Label>Usage</Form.Label>
	            <Form.Control defaultValue={this.props.default_usage} ref={this.usageInput}  />
	          </Form.Group>
	          <Form.Group controlId="formGroupUsageTranslation">
	            <Form.Label>Usage Translation</Form.Label>
	            <Form.Control defaultValue={this.props.default_translation} ref={this.usageTranslationInput}  />
	          </Form.Group>
	        </Form>
	      </Modal.Body>
	      <Modal.Footer>
	        <Button onClick={this.props.onHide}>Close</Button>
	        <Button onClick={this.postDefinition}>Save</Button>
	      </Modal.Footer>
	    </Modal>
	  );
	}
}

function DefinitionForm(props) {
  const [modalShow, setModalShow] = React.useState(false);
	console.log(props)
  return (
    <ButtonToolbar>
      <Button size="sm" variant="primary" onClick={() => setModalShow(true)}>
        {props.buttonText}
      </Button>

      <MyVerticallyCenteredModal
      	entry_id={props.entryID}
      	definition_id={props.definitionID}
      	default_definition={props.defaultDefinition}
      	default_usage={props.defaultUsage}
      	default_translation={props.defaultUsageTranslation}
        show={modalShow}
        onHide={() => setModalShow(false)}
        // onSave={() => saveDefinition(props.entryID, props.definitionID)}
      />
    </ButtonToolbar>
  );
}



export default DefinitionForm;
