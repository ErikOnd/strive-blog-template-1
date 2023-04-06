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
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch(`${apiUrl}/blogPosts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setBlogPosts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      {blogPosts?.blogPosts?.map((blogPost) => (
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
