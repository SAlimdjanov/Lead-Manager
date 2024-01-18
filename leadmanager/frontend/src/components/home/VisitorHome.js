/**
 * VistorHome.js
 *
 * Home page view for visiting users
 */

import React from "react";
import { Container, Image, Button } from "react-bootstrap";

import desktop1 from "../../assets/desktop-1.jpg";

export default function VisitorHome() {
    return (
        <>
            <Container className="mt-3 mb-3">
                <p>
                    Unlock the power of seamless lead management with LeadFlow Pro. We understand
                    that turning potential leads into valued customers is the heartbeat of your
                    business. Our intuitive and robust app is designed to streamline your lead
                    management process, empowering you to focus on what you do best - growing your
                    business.
                </p>
            </Container>
            <Container className="text-center mt-3 mb-3">
                <Image src={desktop1} className="mx-auto" width="350" height="500" fluid rounded />
            </Container>
            <Container className="mt-3 mb-3">
                <h3>Why Choose LeadFlow Pro?</h3>
                <ul>
                    <li>
                        <b>Effortless Lead Capture</b>: Capture leads effortlessly with our
                        user-friendly interface. Turn website visitors and contacts into
                        opportunities with just a few clicks.
                    </li>
                    <li>
                        <b>Smart Organization</b>: Say goodbye to scattered data! LeadFlow Pro helps
                        you organize and categorize leads, ensuring no opportunity slips through the
                        cracks.
                    </li>
                    <li>
                        <b>Customizable Workflows</b>: Tailor your lead management process to fit
                        your unique business needs. Our customizable workflows adapt to your
                        specific sales journey, making it easy to nurture leads to conversion.
                    </li>
                    <li>
                        <b>Real-Time Analytics</b>: Gain insights that matter. Track lead activity,
                        analyze performance, and make informed decisions with our real-time
                        analytics dashboard.
                    </li>
                </ul>
            </Container>
            <Container className="mt-3 mb-3">
                <h3>Ready to Transform Your Lead Management Experience?</h3>
                <p>
                    Sign up for a free account today and experience the difference. Join the many
                    businesses already benefitting from LeadFlow Pro's powerful lead management
                    features.
                </p>
                <Button href="/register" type="submit">
                    Sign Up
                </Button>
            </Container>
        </>
    );
}
