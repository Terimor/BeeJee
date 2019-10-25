import React from 'react';
import {Button, Modal} from "react-bootstrap";

class EditTextModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: this.props.text
        }
    }

    saveMessage = () => {
        this.props.onEditSave(this.state.text);
    };


    render() {


        return (
            <Modal
                onHide={this.props.onHide}
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Редактирование
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Введите новый текст задания</h5>
                    <textarea className="form-control" value={this.state.text} onChange={(e) => this.setState({text: e.target.value})}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={this.props.onHide}>Закрыть</Button>
                    <Button variant="success" onClick={this.saveMessage}>Сохранить</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EditTextModal;