/**
 * Login.js
 *
 * Application Login page
 */

import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Spinner, Container } from "react-bootstrap";

import { register } from "../../features/auth";

export default function Register() {
    const dispatch = useDispatch();
    const { registered, loading } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const { first_name, last_name, email, password } = formData;

    const onFieldChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        dispatch(register({ first_name, last_name, email, password }));
    };

    if (registered) {
        return <Navigate to="/login"></Navigate>;
    }

    return (
        <Layout
            title="LeadFlow: Register"
            content="LeadFlow registration page"
            header="Register for a LeadFlow Account"
        >
            <Container className="pl-5 pr-5 text-center">
                <p>
                    Welcome to LeadFlow. Have an account? Sign in <a href="/login">here</a>.
                </p>
            </Container>
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mt-3" controlId="formFirstName">
                    <Form.Label>
                        <b>First Name</b>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Bob"
                        onChange={onFieldChange}
                        name="first_name"
                        value={first_name}
                        autoComplete="given-name"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-3" controlId="formLastName">
                    <Form.Label>
                        <b>Last Name</b>
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Example"
                        onChange={onFieldChange}
                        name="last_name"
                        value={last_name}
                        autoComplete="family-name"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-3" controlId="formEmail">
                    <Form.Label>
                        <b>Email</b>
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="bob@example.com"
                        onChange={onFieldChange}
                        name="email"
                        value={email}
                        autoComplete="email"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-3" controlId="formPassword">
                    <Form.Label>
                        <b>Password</b>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        onChange={onFieldChange}
                        name="password"
                        value={password}
                        required
                    />
                </Form.Group>
                {loading ? (
                    <Spinner>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <Button className="mt-3" type="submit">
                        Register
                    </Button>
                )}
            </Form>
        </Layout>
    );
}
