import React from "react";
import { Container } from "react-bootstrap";

export default function NotFound() {
    return (
        <Container className="mt-5" style={{ textAlign: "center" }}>
            <h1>404: Not Found</h1>
            <p>
                The resource you are looking for has been moved elsewhere or removed from the site.
            </p>
        </Container>
    );
}
