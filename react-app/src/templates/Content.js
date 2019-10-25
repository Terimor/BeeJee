import React from 'react';
import Task from '../components/Task';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import AddTaskForm from "../components/AddTaskForm";
import Context from '../Context';

class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            total_amount: 0,
            order: {
                order_by: 'id',
                direction: 'DESC'
            },
            page: 1
        }
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = (page = false) => {
        axios.post('/?controller=Common_api&action=getTasks', {
            order: this.state.order,
            page: page || this.state.page
        }).then(data => {
            this.setState({
                tasks: data.data.tasks,
                total_amount: data.data.total_amount
            });
        });
    };

    pageChange = (page) => {
        this.setState({
            page: page
        }, this.getTasks);
    };

    orderChange = (order_by = false, direction = false) => {
        this.setState((state) => ({
            order: {
                order_by: order_by || state.order.order_by,
                direction: direction || state.order.direction
            }
        }), () => this.getTasks());
    };


    render() {
        const tasks = this.state.tasks.map(task => {
            return <Task task={task} key={task.id} reloadTasks={this.getTasks}/>;
        });

        return (
            <div className="content-field">
                <AddTaskForm reloadTasks={this.getTasks}/>
                <div className="d-flex flex-column align-items-center my-3">
                    <h3>Список задач:</h3>
                    <div className="my-2">
                        <h4>Сортировка</h4>
                        <div className="d-flex justify-content-between">
                            <label>Поле</label>
                            <select className="form-control" value={this.state.order.order_by}
                                    onChange={(e) => this.orderChange(e.target.value, false)}>
                                <option value="id">ID</option>
                                <option value="user_name">Имя</option>
                                <option value="user_email">Почта</option>
                                <option value="status">Статус</option>
                            </select>
                            <label>Направление</label>
                            <select className="form-control" value={this.state.order.direction}
                                    onChange={(e) => this.orderChange(false, e.target.value)}>
                                <option value="DESC">Нисходящая</option>
                                <option value="ASC">Восходящая</option>
                            </select>
                        </div>
                    </div>
                    {(this.state.total_amount > 3) &&
                    <Pagination
                        activePage={this.state.page}
                        itemsCountPerPage={this.context.tasks_per_page}
                        totalItemsCount={this.state.total_amount}
                        pageRangeDisplayed={5}
                        onChange={this.pageChange}
                        itemClass="page-item"
                        linkClass="page-link"/>}
                    {tasks.length ? tasks : <h5>Пока пусто :(</h5>}
                    {(this.state.total_amount > 3) &&
                    <Pagination
                        activePage={this.state.page}
                        itemsCountPerPage={this.context.tasks_per_page}
                        totalItemsCount={this.state.total_amount}
                        pageRangeDisplayed={5}
                        onChange={this.pageChange}
                        itemClass="page-item"
                        linkClass="page-link"/>}
                </div>
            </div>
        )
    }
}

Content.contextType = Context;

export default Content;