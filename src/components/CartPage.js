import React, { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import { ListGroup, Button, Row, Col, Form, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

import Rating from "./Rating";

const CartPage = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row className="cartRow">
                <Col md={2}>
                  <Image
                    className="cartImg"
                    src={prod.image}
                    alt={prod.name}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={2}>{prod.name}</Col>
                <Col md={2}>Tk. {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: { id: prod.id, qty: e.target.value },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => {
                      return <option key={x + 1}>{x + 1}</option>;
                    })}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <AiFillDelete
                    // className="cartDelIcon"
                    fontSize="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      });
                    }}
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <div className="title">Subtotal ({cart.length}) items</div>
        <h5>Total: Tk.{total}</h5>
        <Button
          className="checkoutButton"
          type="button"
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
