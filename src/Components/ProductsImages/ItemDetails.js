import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardBody, CardText, Row, Col, Button } from "react-bootstrap";

const ItemDetails = () => {
    const { state } = useLocation();
   const cardData = state.item;
   console.log(cardData)

    return (
        <div>
            <h1>{cardData.title}</h1>

            <Card  style={{ width: '600px', margin: '0 auto', }} className="mb-2">
                        <Row>
                            <Col md={8}>
                                {/* <li>{cardData.id}</li> */}
                                <img src={cardData.thumbnail} alt="timages" style={{ width: '100%', margin: '10px' }} />
                            </Col>

                            <Col md={4}>
                                <CardBody>
                                    <CardText>
                                        {cardData.description}
                                    </CardText>
                                    <CardText>
                                        $ {cardData.price}
                                    </CardText>
                                </CardBody>
                               
                            </Col>
                        </Row>

                    </Card>
        </div>
    )
}
export default ItemDetails;