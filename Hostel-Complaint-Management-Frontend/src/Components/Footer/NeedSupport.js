import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './NeedSupport.css'
import CountUp from 'react-countup';
const SupportSection = () => {
    return (
        <section className='our-support-wrapper'>
            <Container className='support-container'>
                <Row>
                    <Col lg={6}>
                        <div className='support-para'>
                            <p>Still You Need Our <span>Support</span>?</p>
                        </div>
                        <div className='support-para2'>
                            <p>Don’t wait make a smart & logical quote here. Its pretty easy.</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className='message-here position-relative '>
                            <input type="text" name="" placeholder="Ask Me A Question!" data-has-listeners="true"/>
                                <button type="button">Message here</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default SupportSection