import React from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { useState, useEffect } from "react";
import { loadPosts } from "../../../data/fetch";

const BlogList = props => {

  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    loadPosts().then((data) => setBlogPosts(data.dati))
  }, [])

  
  return (
    <Row>
      {blogPosts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
