import React, { useEffect, useState } from 'react';
import {
    Navbar,
    Nav,
    Form,
    Button,
    FormControl,
    Image, NavDropdown
} from 'react-bootstrap';
import {NavLink, useHistory} from 'react-router-dom';
import Logo from '../assets/images/logo.svg';
import '../assets/css/public/styles.css';
import {genreActions, authActions} from '../actions';
import {useDispatch, useSelector} from 'react-redux'; 

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres.genres);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [validated, setValidated] = useState(false);
    const [searchWord, setSearchWord] = useState('');

    useEffect(()=>{
        dispatch(genreActions.fetchGenres(''));
    },[isAuthenticated]);

    function doLogout(){
        dispatch(authActions.logout());
    }

    function handleChange(e){
        setSearchWord(e.target.value);
    }

    function handleSearch(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        if(form.checkValidity() === true) {
            history.push('/public/search/'+searchWord)
        }
    }

    return (
        <header>
            <Navbar variant="dark" expand="md" fixed="top" className="public-header shadow-sm">
                <Navbar.Brand to="/" as={NavLink} className="bg-none">
                    <Image src={Logo} className="mr-2" width={24} height={24} />
                    Rating App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <NavDropdown title="Genres" id="basic-nav-dropdown">
                            {genres.length > 0 && genres.map((genre, index) => 
                             <NavDropdown.Item key={index} as={NavLink} to={`/public/genre/${genre.name}`}>{genre.name}</NavDropdown.Item>)}
                        </NavDropdown>
                        <Nav.Link as={NavLink} to="/public/popular">Popular</Nav.Link>
                        <Nav.Link  as={NavLink} to="/public/releases">New releases</Nav.Link>
                    </Nav>
                    <Nav>
                    {isAuthenticated && <Nav.Link as={NavLink} to="/public/account">My Account</Nav.Link>}
                    {!isAuthenticated && <Nav.Link as={NavLink} to="/login">Login</Nav.Link>}
                    {!isAuthenticated && <Nav.Link as={NavLink} to="/public/signup">Signup</Nav.Link>}
                    {isAuthenticated && <Nav.Link  onClick={() => doLogout()}>Logout</Nav.Link>}
                    </Nav>
                    <Form inline noValidate validated={validated} onSubmit={(e) => handleSearch(e)}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchWord} onChange={(e) => handleChange(e)} required />
                        <Button variant="outline-light" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export { Header };