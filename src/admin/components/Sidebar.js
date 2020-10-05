import React from 'react';
import {NavLink} from 'react-router-dom';
import {
    Nav
} from 'react-bootstrap';

import '../../assets/css/admin/sidebar.css';

import { 
    FiHome,
    FiUsers,
    FiFilm,
    FiPlusCircle,
    FiFolder,
    FiFolderPlus,
    FiFilePlus,
    FiUserPlus,
    FIUser
} from "react-icons/fi";


function Sidebar({show}) {

    return (
        <div id="sidebarMenu" className={`col-md-3 col-lg-2 d-md-block bg-light sidebar collapse ${show ? "show" : ""}`}>
            <div className="sidebar-sticky pt-3">
                <Nav as="ul" className="flex-column">
                    <Nav.Item as="li">
                        <Nav.Link to="/admin/dashboard" as={NavLink}>
                            <FiHome className="feather mr-2"/>
                            Dashboard
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Movies</span>
                    <NavLink className="d-flex align-items-center text-muted" to="/admin/add/movie" aria-label="Add a new movie">
                        <FiPlusCircle />
                    </NavLink>
                </h6>
                <Nav as="ul" className="flex-column mb-2">
                    <Nav.Item  as="li">
                        <Nav.Link to="/admin/movies" as={NavLink}>
                            <FiFilm className="feather mr-2"/>
                            Movies
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item  as="li">
                        <Nav.Link to="/admin/add/movie" as={NavLink}>
                            <FiFilePlus className="feather mr-2"/>
                            New Movie
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item  as="li">
                        <Nav.Link to="/admin/genres" as={NavLink}>
                            <FiFolder className="feather mr-2"/>
                            Genres
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item  as="li">
                        <Nav.Link to="/admin/add/genre" as={NavLink}>
                            <FiFolderPlus className="feather mr-2"/>
                            New Genre
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Casting Members</span>
                    <NavLink className="d-flex align-items-center text-muted" to="/admin/add/cast" aria-label="Add a new cast member">
                        <FiPlusCircle />
                    </NavLink>
                </h6>
                <Nav as="ul" className="flex-column mb-2">
                    <Nav.Item  as="li">
                        <Nav.Link to="/admin/casts" as={NavLink}>
                            <FiUsers className="feather mr-2"/>
                            Members
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item  as="li">
                        <Nav.Link to="/admin/add/cast" as={NavLink}>
                            <FiUserPlus className="feather mr-2"/>
                            New Member
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Users</span>
                    <NavLink className="d-flex align-items-center text-muted" to="/admin/users/new" aria-label="Add a new user">
                        <FiPlusCircle />
                    </NavLink>
                </h6>
                <Nav as="ul" className="flex-column mb-2">
                    <Nav.Item  as="li">
                        <Nav.Link to="/admin/users" as={NavLink}>
                            <FiUsers className="feather mr-2"/>
                            Users
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item  as="li">
                        <Nav.Link to="/admin/users/new" as={NavLink}>
                            <FiUserPlus className="feather mr-2"/>
                            New User
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
    )
}

export { Sidebar };