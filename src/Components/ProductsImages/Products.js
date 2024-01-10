import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, CardText, Row, Col, Button } from "react-bootstrap";
import Loading from "../Loading";
import { useNavigate,Redirect } from "react-router-dom";



const Products = (props) => {

    const [products, setProducts] = useState([])
    const [hasmore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)
  


    const navigate = useNavigate()
    const elementRef = useRef(null)


    function onIntersection(entries) {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && hasmore) {
            fetchMoreItems()
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection)
        if (observer && elementRef.current) {
            observer.observe(elementRef.current)
        }
        return () => {
            if (observer) {
                observer.disconnect()
            }
        }

    }, [products])


    async function fetchMoreItems() {
        setHasMore(true)
        const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10}`)
        const data = await response.json()
        if (data.products.length == 0) {
            setHasMore(false)
        }
        else {
            setProducts(prevproducts => [...prevproducts, ...data.products])
            setPage(prevpage => prevpage + 1)
        }
    }


    const seedetails = (item) => {

        console.log("clicked show button",item)
            return navigate(`/items/${item.id}`,{ state: {item},})
    }
    return (
        <div>

            <h1>heloo</h1>

            {
                products.map(item =>

                    <Card key={item.id} style={{ width: '600px', margin: '0 auto', }} className="mb-2">
                        <Row>
                            <Col md={8}>
                                <li>{item.id}</li>
                                <img src={item.thumbnail} alt="timages" style={{ width: '100%', margin: '10px' }} />
                            </Col>

                            <Col md={4}>
                                <CardBody>
                                    <CardText>
                                        {item.description}
                                    </CardText>
                                    <CardText>
                                        $ {item.price}
                                    </CardText>
                                </CardBody>
                                <Button style={{ marginBottom: '10px' }} onClick={()=>seedetails(item)}>SeeMore</Button>
                            </Col>
                        </Row>

                    </Card>
                )
            }

            {
                hasmore && <div ref={elementRef} style={{ textAlign: 'center' }} > <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div></div>
            }

        </div>
    )
}
export default Products;