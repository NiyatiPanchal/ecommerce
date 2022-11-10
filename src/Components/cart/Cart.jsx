import { React, useState, useEffect } from "react";
import CartCards from "./CartCards";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styled from "styled-components";

const TotalPrice = styled.p`
  background: #394f8a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin: 15px;
  padding: 10px;
  width: 300px;
  font-size: 20px;
  font-family: "Josefin Sans", sans-serif;
  border-radius: 5px;
`;

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all products
      const response = await fetch(
        "http://localhost:5000/api/cart/fetchallcartproducts",
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      setProducts(json);
    };

    fetchData();
  }, [isUpdateQuantity]);

  useEffect(() => {
    const totalPrice = () => {
      let total = 0;
      for (let i = 0; i < products.length; i++) {
        total = total + products[i].quantity * products[i].price;
      }
      setPrice(total);
    };

    totalPrice();
  }, [products]);

  return (
    <>
      <Container style={{ margin: "0 auto" }}>
        <Row>
          {products && products.length > 0 ? (
            products.map((product) => (
              <Col lg={3} md={6} sm={6} xs={12} className="mt-3">
                <CartCards
                  product={product}
                  setIsUpdateQuantity={setIsUpdateQuantity}
                  isUpdateQuantity={isUpdateQuantity}
                />
              </Col>
            ))
          ) : (
            <h6>No data available to display</h6>
          )}
        </Row>
      </Container>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TotalPrice>Total Price : ₹{price}</TotalPrice>
      </div>
    </>
  );
};

export default Cart;
