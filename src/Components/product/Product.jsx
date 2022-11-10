import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const initialProduct = {
  name: "",
  image: "",
  description: "",
  quantity: "1",
  price: "",
};

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState();
  const [product, setProduct] = useState(initialProduct);

  const navigate = useNavigate();

  const getImage = async (e) => {
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("name", file.name);

      // API Call
      const response = await fetch(
        "http://localhost:5000/api/product/file/upload",
        {
          method: "POST",
          mode: "cors",
          body: data,
        }
      );
      const json = await response.json();
      product.image = json.imageURL;
    }
  };

  const saveProduct = async () => {
    await getImage();
    // API call
    const response = await fetch(
      "http://localhost:5000/api/product/createproduct",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          image: product.image,
          description: product.description,
          quantity: product.quantity,
          price: product.price,
        }),
      }
    );

    const json = await response.json();

    if (json.success) {
      navigate("/");
    }
  };

  const decreaseQuantity = () => {
    let newQuantity;
    quantity === 1 ? (newQuantity = 1) : (newQuantity = quantity - 1);
    setQuantity(newQuantity);
    product.quantity = newQuantity;
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    product.quantity = newQuantity;
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-4" style={{ width: "40%", margin: "auto" }}>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            onChange={(e) => handleChange(e)}
            name="name"
          />
        </Form.Group>

        <Form.Group className="mb-4" style={{ width: "40%", margin: "auto" }}>
          <Form.Label>Product Image</Form.Label>

          <Form.Control
            type="file"
            accept=".jpg,.gif,.png"
            name="image"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </Form.Group>

        <Form.Group
          className="mb-4"
          controlId="exampleForm.ControlTextarea1"
          style={{ width: "40%", margin: "auto" }}
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => handleChange(e)}
            name="description"
          />
        </Form.Group>

        <Form.Group
          className="mb-4"
          controlId="exampleForm.ControlTextarea1"
          style={{ width: "40%", margin: "auto" }}
        >
          <Form.Label>Quantity</Form.Label>
          <Row>
            <Col xs={1}>
              <Button variant="outline-dark" onClick={decreaseQuantity}>
                -
              </Button>
            </Col>
            <Col xs={6}>
              <Form.Control type="number" value={quantity} name="quantity" />
            </Col>
            <Col xs={1}>
              <Button variant="outline-dark" onClick={increaseQuantity}>
                +
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <InputGroup className="mb-4" style={{ width: "40%", margin: "auto" }}>
          <InputGroup.Text>Price</InputGroup.Text>
          <InputGroup.Text>₹</InputGroup.Text>
          <Form.Control
            aria-label="Dollar amount (with dot and two decimal places)"
            onChange={(e) => handleChange(e)}
            name="price"
          />
        </InputGroup>

        <Button
          variant="primary"
          style={{ marginLeft: "50%", background: "#394f8a" }}
          onClick={() => saveProduct()}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Product;
