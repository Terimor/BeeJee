import React from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from 'axios';

class LoginModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = getInitialState();
    }

    login = () => {
        if(this.state.login && this.state.password){
            axios.post('/?action=login', {
                login: this.state.login,
                password: this.state.password
            }).then(data => {
                if (data.data.result) {
                    window.location.reload();
                } else {
                    alert(data.data.message);
                }
            });
        }else{
            alert('Заполните поля!');
        }
    };

    render() {
        const onHide = () => {
            this.props.onHide();
        };

        return (
            <Modal
                onHide={onHide}
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Вход
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Введите учетные данные</h5>
                    <div>
                        <label htmlFor="login_login">Почта</label>
                        <input className="form-control" value={this.state.login}
                               onChange={(e) => this.setState({login: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor="login_password">Пароль</label>
                        <input className="form-control" type="password" value={this.state.password}
                               onChange={(e) => this.setState({password: e.target.value})}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={onHide}>Закрыть</Button>
                    <Button variant="success" onClick={this.login}>Войти</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

function getInitialState() {
    return {
        login: '',
        password: ''
    }
}

export default LoginModal;