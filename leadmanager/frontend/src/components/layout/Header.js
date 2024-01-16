import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

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
        <Navbar
            bg="body-secondary"
            expand="sm"
            fixed="top"
            style={{ paddingLeft: "15px", paddingRight: "15px" }}
        >
            <Navbar.Brand className="" href="/">
                Lead Manager
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="me-auto">{isAuthenticated ? authLinks : guestLinks}</Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
