import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Div = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  word-break: break-word;
  font-family: "Raleway", sans-serif;
  color: #000000;
`;

const Para = styled.p`
  word-break: break-word;
  font-family: "Raleway", sans-serif;
  color: #000000;
  font-weight: 600;
  margin: 10px 0;
`;

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/product/products/${id}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      setProduct(json.product);
      setAddedToCart(json.isInCart);
    };

    fetchData();
  }, [id]);

  const addToCart = async () => {
    // API call
    const response = await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productID: id,
        quantity: quantity,
        price: product.price,
      }),
    });

    const json = await response.json();
    if (json.success) {
      setAddedToCart(true);
      setError("");
    } else {
      setError(json.message);
    }
  };

  const decreaseQuantity = () => {
    let newQuantity;
    quantity === 0 ? (newQuantity = 0) : (newQuantity = quantity - 1);
    setQuantity(newQuantity);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  return (
    <>
      <Div>
        <Container>
          <Row>
            <Col lg={6} md={12} sm={12} xs={12}>
              <img
                src={product.image}
                style={{
                  width: "80%",
                  height: "50vh",
                  objectFit: "cover",
                  alignSelf: "center",
                }}
                alt="Product"
              />
            </Col>
            <Col lg={6} md={12} sm={12} xs={12}>
              <Name>{product.name}</Name>
              <hr />
              <Para>{product.description}</Para>
              <div style={{ display: "flex", alignSelf: "center" }}>
                <Para>Quantity : </Para>
                <Button
                  variant="outline-dark"
                  style={{ marginLeft: 5 }}
                  onClick={decreaseQuantity}
                >
                  -
                </Button>
                <Para style={{ margin: "0px 10px" }}>{quantity}</Para>
                <Button variant="outline-dark" onClick={increaseQuantity}>
                  +
                </Button>
                {error !== "" && <p>{error}</p>}
              </div>
              <Para>Price : ₹{product.price}</Para>
              {addedToCart ? (
                <Link to="/cart">
                  <Button
                    style={{ background: "#394f8a", alignSelf: "flex-end" }}
                  >
                    Go to Cart
                  </Button>
                </Link>
              ) : (
                <Button
                  style={{ background: "#394f8a", alignSelf: "flex-end" }}
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </Div>
    </>
  );
};

export default ProductDetail;
