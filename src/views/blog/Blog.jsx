import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_BE_URL;

  useEffect(() => {
    const url = window.location.href;
    const id = url.split("/").pop();
    getBlogPost(id);
  }, []);

  const getBlogPost = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/blogPosts/${id}`);
      const data = await res.json();
      if (res.ok) {
        setBlog(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="loading-div">loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>
          <span className="pdf-download">PDF download</span>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>
    );
  }
};

export default Blog;
