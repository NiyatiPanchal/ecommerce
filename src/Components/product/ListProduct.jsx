import { React, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch all posts
      const response = await fetch(
        "http://localhost:5000/api/product/fetchallproducts",
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
  }, []);

  return (
    <>
      <Container style={{ margin: "0 auto" }}>
        <Row>
          {products && products.length > 0 ? (
            products.map((product) => (
              <Col lg={3} md={6} sm={6} xs={12} className="mt-3">
                <Link
                  to={`/details/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ProductCard product={product} />
                </Link>
              </Col>
            ))
          ) : (
            <h6>No data available to display</h6>
          )}
        </Row>
      </Container>
    </>
  );
};

export default ListProduct;
