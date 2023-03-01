import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
const BlogItem = (props) => {
  return (
    <Link to={`/blog/${props.id}`} className="blog-link">
      {console.log(`/blog/${props.id}`)}
      <Card className="blog-card">
        <Card.Img variant="top" src={props.cover} className="blog-cover" />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <BlogAuthor {...props.author} />
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
