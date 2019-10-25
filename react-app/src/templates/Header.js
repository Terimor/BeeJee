import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import LoginModal from '../components/LoginModal';
import Context from '../Context';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false
        }
    }

    onModalHide = () => {
        this.setState({
            modalShow: false
        })
    };

    onModalShow = () => {
        this.setState({
            modalShow: true
        })
    };

    render() {
        const icon = !!(+this.context.is_admin) ?
            <a href="/?action=logout"><i className="fa fa-lg fa-sign-out cursor-pointer" aria-hidden="true"/>Выйти</a> :
            <span className="cursor-pointer" onClick={this.onModalShow}><i className="fa fa-lg fa-sign-in"
                                                                           aria-hidden="true"/>Войти</span>;
        return (
            <>
                <Navbar bg="dark" variant="dark" className="d-flex justify-content-between">
                    <Navbar.Brand>Задачник</Navbar.Brand>
                    <Nav className="header-icons d-flex">
                        <span className="cursor-pointer">
                            {icon}
                        </span>
                    </Nav>
                </Navbar>
                <LoginModal onHide={this.onModalHide} show={this.state.modalShow}/>
            </>
        );
    }
}

Header.contextType = Context;

export default Header;