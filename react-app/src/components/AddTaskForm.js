import React from 'react';
import Button from "react-bootstrap/Button";
import axios from 'axios';

class AddTaskForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user_name: '',
            user_email: '',
            text: ''
        }
    }

    addTask = () => {
        if(this.state.user_name && this.state.user_email && this.state.text){
            axios.post('/?controller=Common_api&action=addTask',this.state)
                .then(data => {
                    let result = data.data;
                    if(result.result){
                        this.setState({
                            text: ''
                        },() => {
                            alert('Задача была успешно добавлена!');
                            this.props.reloadTasks();
                        });
                    }else{
                        alert(result.message);
                    }
                });
        }else{
            alert('Заполните все поля!');
        }
    };

    render() {
        return(
            <div>
                <div>
                    <label>Ваше имя</label>
                    <input className="form-control" type="text" placeholder="Иван Иванов" value={this.state.user_name} onChange={(e) => this.setState({user_name: e.target.value})} />
                </div>
                <div>
                    <label>Ваше почта</label>
                    <input className="form-control" type="text" placeholder="example@example.com" value={this.state.user_email} onChange={(e) => this.setState({user_email: e.target.value})} />
                </div>
                <div>
                    <label>Текст</label>
                    <textarea className="form-control" placeholder="Задача..." value={this.state.text} onChange={(e) => this.setState({text: e.target.value})} />
                </div>
                <Button variant="success" onClick={this.addTask}>Добавить</Button>
            </div>
        )
    }
}

export default AddTaskForm;
