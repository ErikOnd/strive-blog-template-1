import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [blogPosts, setBlogPosts] = useState();

  useEffect(() => {
    getBlogPosts();
  }, []);

  const getBlogPosts = async () => {
    try {
      const res = await fetch("http://localhost:3001/blogPosts");
      const data = await res.json();
      if (res.ok) {
        console.log(data);
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
