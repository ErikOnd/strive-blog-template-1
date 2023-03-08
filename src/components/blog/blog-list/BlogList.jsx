import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [blogPosts, setBlogPosts] = useState();
  const apiUrl = process.env.REACT_APP_BE_URL;
  useEffect(() => {
    getBlogPosts();
  }, []);

  const getBlogPosts = async () => {
    try {
      const res = await fetch(`${apiUrl}/blogPosts`);
      const data = await res.json();
      if (res.ok) {
        setBlogPosts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      {blogPosts?.map((blogPost) => (
        <Col
          key={blogPost.title}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={blogPost.title} {...blogPost} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
