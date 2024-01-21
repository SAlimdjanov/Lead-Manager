import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth";

import Cookies from "js-cookie";
import brandIcon from "../../assets/icon-briefcase.png";

export default function Header() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.user);

    const handleLogout = () => {
        Cookies.remove("access");
        Cookies.remove("refresh");
        dispatch(logout());
    };

    const authLinks = (
        <>
            <Nav.Link href="dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/" onClick={handleLogout}>
                Logout
            </Nav.Link>
        </>
    );

    const guestLinks = (
        <>
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="register">Register</Nav.Link>
        </>
    );

    return (
        <Navbar bg="body-secondary" expand="sm">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt="logo"
                        src={brandIcon}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{" "}
                    LeadFlow
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="me-auto">{isAuthenticated ? authLinks : guestLinks}</Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
