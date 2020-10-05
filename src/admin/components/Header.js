import React from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {authActions} from '../../actions';
import {
    Navbar,
    Nav,
    FormControl,
    Image
} from 'react-bootstrap';
import Logo from '../../assets/images/logo.png';
import '../../assets/css/admin/header.css';

function Header({toggleSidebar, showSidebar}) {

    const dispatch = useDispatch()

    function handleLogout(){
       dispatch(authActions.logout());
    }

    return (
        <Navbar bg="dark" expand="md" variant="dark" sticky="top" className="flex-md-nowrap shadow p-0">
            <Navbar.Brand href="/admin/dashboard" className="mr-0 px-3 py-2 col-md-3 col-lg-2 collapsed">
                <Image src={Logo} className="mr-2" width={24} height={24}/>
                Rating App
            </Navbar.Brand>
            
            <Navbar.Toggle
                className="position-absolute d-md-none" 
                aria-controls="sidebarMenu"
                expanded={showSidebar.toString()}
                onClick={() => toggleSidebar()}/>

            <FormControl type="text" placeholder="Search" className="form-control-dark w-100" />
            <Nav className="px-3">
                <Nav.Item className="text-nowrap">
                    <Nav.Link as={NavLink} to="admin/account">Account</Nav.Link>
                </Nav.Item>
                <Nav.Item className="text-nowrap">
                    <Nav.Link onClick={() => handleLogout()}>Signout</Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}
export { Header };