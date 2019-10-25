import React from 'react';
import Button from "react-bootstrap/Button";
import EditTextModal from './EditTextModal';
import Context from '../Context';
import axios from "axios";

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
        }
    }

    editTask = (text) => {
        if (text || this.props.task.text) {
            axios.put('/?controller=Admin_api&action=editTaskText', {
                'id': this.props.task.id,
                'text': text
            }).then((data) => {
                let result = data.data;
                if (result.result) {
                    this.modalHide();
                    alert('Задача успешно отредактирована!');
                    this.props.reloadTasks();
                } else {
                    alert(result.message);
                }
            })
        } else {
            alert('Текст задачи не может быть пустым!');
        }
    };

    completeTask = () => {
        axios.put('/?controller=Admin_api&action=completeTask&id=' + this.props.task.id)
            .then((data) => {
                let result = data.data;
                if (result.result) {
                    this.modalHide();
                    alert('Задача выполнена!');
                    this.props.reloadTasks();
                } else {
                    alert(result.message);
                }
            })
    };

    modalShow = () => {
        this.setState({
            modalShow: true
        });
    };

    modalHide = () => {
        this.setState({
            modalShow: false
        })
    };

    render() {
        const is_admin = !!(+this.context.is_admin);
        const task = this.props.task;
        const status = !!(+task.status);
        return (
            <>
                <div className="task-container" style={{backgroundColor: (status ? 'green' : 'grey')}}>
                    <div className="m-3">
                        <h4>Задача #{task.id}</h4>
                        <h5>Имя пользователя - {task.user_name}</h5>
                        <h5>Почта - {task.user_email}</h5>
                        <h5>Задача: </h5>
                        <div className="task-text-container">{task.text}</div>
                        {is_admin && <Button variant="danger" onClick={this.modalShow}>Редактировать</Button>}
                        {status ?
                            <h6>Задача выполнена</h6> :
                            is_admin &&
                            <Button variant="success" onClick={this.completeTask}>Выполнить</Button>
                        }
                        {!!(+task.is_edited) && <legend>Отредактировано администратором</legend>}
                    </div>
                </div>
                <EditTextModal show={this.state.modalShow} onHide={this.modalHide}
                               onEditSave={this.editTask} text={task.text}/>
            </>
        )
    }
}

Task.contextType = Context;

export default Task;