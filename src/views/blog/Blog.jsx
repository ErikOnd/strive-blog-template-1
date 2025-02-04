import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import BlogPostComments from "./BlogPostComments";
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
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch(`${apiUrl}/blogPosts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
          <a
            className="pdf-download"
            href={`${apiUrl}/blogPosts/pdf/${blog.id}`}
          >
            PDF download
          </a>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                className="mb-4"
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} />
              </div>
            </div>
          </div>

          <div
            className="mb-5"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
          <BlogPostComments blogId={blog.id}></BlogPostComments>
        </Container>
      </div>
    );
  }
};

export default Blog;
