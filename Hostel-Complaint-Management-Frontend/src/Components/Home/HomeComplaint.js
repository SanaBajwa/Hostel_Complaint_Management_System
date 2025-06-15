import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./HomeComplaint.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import photo1 from "../assets/images/Vector-6.png";
import Advanimg from "../assets/images/testimonial.png";

const Advantage = () => {
  const Advantage = [
    {
      id: 1,
      image: photo1,
      paragraph:
        "“The other hand we denounce righteous indignation men who are so beguiled and demoralized by the moment. Dislike men who so development co”",
      h3: "Alex Gibson",
      h6: "Telemarketer",
    },
    {
      id: 2,
      image: photo1,
      paragraph:
        "“The other hand we denounce righteous indignation men who are so beguiled and demoralized by the moment. Dislike men who so development co”",
      h3: "Alex Gibson",
      h6: "Telemarketer",
    },
    {
      id: 3,
      image: photo1,
      paragraph:
        "“The other hand we denounce righteous indignation men who are so beguiled and demoralized by the moment. Dislike men who so development co”",
      h3: "Alex Gibson",
      h6: "Telemarketer",
    },
  ];

  return (
    <section className="AdvantageWrapper">
      <Container>
        <h1 className="AdvantageHeading">Advantage</h1>
        <Row>
         <Col lg={8}>
         <Row>
         <Swiper
            className="AdvantageSwiper"
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".button-next",
              prevEl: ".button-prev",
            }}
            modules={[Navigation]}
          >
            {Advantage.map((Advan) => (
              <SwiperSlide key={Advan.id}>
                <Col lg={12}>
                  <div>
                    <img
                      variant="top"
                      src={Advan.image}
                      alt={Advan.heading}
                      className="Advan-image"
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="AdvantageSwiperWrapper">
                    <div>
                      <Card className="Advan-item">
                        <Card.Body>
                          <Card.Text className="AdvanPara">
                            {Advan.paragraph}
                          </Card.Text>
                          <div className="card-title-buttons">
                            <div className="card-titles d-flex justify-content-between">
                              <div>
                                <Card.Title className="Advanh3">
                                  {Advan.h3}
                                </Card.Title>
                                <Card.Title className="Advanh6">
                                  {Advan.h6}
                                </Card.Title>
                              </div>
                              <div className="Advantage-slider-control">
                                <button
                                  type="button"
                                  className="button-prev me-1"
                                >
                                  <svg
                                    width="27"
                                    height="16"
                                    viewBox="0 0 27 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.17143 7.76953H26H1.17143Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M1.17143 7.76953H26"
                                      stroke="black"
                                      strokeWidth="2"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7.94139 14.5391L1.1722 7.76983L7.94139 1.0006"
                                      fill="black"
                                    />
                                    <path
                                      d="M7.94139 14.5391L1.1722 7.76983L7.94139 1.0006"
                                      stroke="black"
                                      strokeWidth="2"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                                <button type="button" className="button-next">
                                  <svg
                                    width="27"
                                    height="16"
                                    viewBox="0 0 27 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M25.8286 7.76953H1H25.8286Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M25.8286 7.76953H1"
                                      stroke="black"
                                      strokeWidth="2"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M19.0586 1.0006L25.8278 7.76983L19.0586 14.5391"
                                      fill="black"
                                    />
                                    <path
                                      d="M19.0586 1.0006L25.8278 7.76983L19.0586 14.5391"
                                      stroke="black"
                                      strokeWidth="2"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </Col>
              </SwiperSlide>
            ))}
          </Swiper>

         </Row>

         </Col> 
       

          <Col lg={4}>
            <div className="Advantage-banner">
              <img src={Advanimg} alt="Advantage Banner" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Advantage;
