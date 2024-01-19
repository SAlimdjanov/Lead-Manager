import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import brandIcon from "../../assets/icon-briefcase.png";

export default function Header() {
    const { isAuthenticated } = useSelector((state) => state.user);

    const authLinks = (
        <>
            <Nav.Link href="dashboard">Dashboard</Nav.Link>
            {/** @todo Implement logout feature */}
            <Nav.Link href="!#">Logout</Nav.Link>
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
