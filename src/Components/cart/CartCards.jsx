import { React, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const initialProduct = {
  name: "",
  image: "",
  description: "",
  quantity: "1",
  price: "",
};

const CartCards = ({ product, setIsUpdateQuantity, isUpdateQuantity }) => {
  const [cartProduct, setCartProduct] = useState(initialProduct);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/product/products/${product.productID}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();
      setCartProduct(json.product);
    };

    fetchData();
  }, [product.productID]);

  const updateQuantity = async (flag) => {
    const response = await fetch(
      `http://localhost:5000/api/cart/updatequantity`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          productID: product.productID,
          quantity: product.quantity,
          flag: flag,
        }),
      }
    );

    const json = await response.json();
    if (json.success) {
      setIsUpdateQuantity(!isUpdateQuantity);
      setError("");
    } else {
      setError(json.message);
    }
  };

  const removeFromCart = async () => {
    const response = await fetch(
      `http://localhost:5000/api/cart/deletefromcart`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          productID: product.productID,
        }),
      }
    );

    const json = await response.json();
    setIsUpdateQuantity(!isUpdateQuantity);
  };

  const decreaseQuantity = () => {
    //flag = 0
    updateQuantity(0);
  };

  const increaseQuantity = () => {
    //flag = 1
    updateQuantity(1);
  };

  return (
    <>
      <Card style={{ width: "16rem", margin: "0 auto" }}>
        <Link
          to={`/details/${product.productID}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card.Img src={cartProduct.image} />
        </Link>

        <Card.Body>
          <Card.Title>{cartProduct.name}</Card.Title>

          <div style={{ display: "flex" }}>
            <Card.Text>Quantity: </Card.Text>
            <Button
              variant="outline-dark"
              style={{ marginLeft: 5 }}
              onClick={decreaseQuantity}
            >
              -
            </Button>
            <Card.Text style={{ margin: "0px 10px" }}>
              {product.quantity}
            </Card.Text>
            <Button variant="outline-dark" onClick={increaseQuantity}>
              +
            </Button>
          </div>

          {error !== "" && <p>{error}</p>}

          <Card.Text>₹{cartProduct.price}</Card.Text>
        </Card.Body>

        <Button
          style={{ background: "#394f8a", color: "#fff" }}
          onClick={removeFromCart}
        >
          Remove
        </Button>
      </Card>
    </>
  );
};

export default CartCards;
