import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const NewBlogPost = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const authorMail = {
    email: "erik.ondra@yahoo.com",
  };
  const [html, setHTML] = useState(null);
  const apiUrl = process.env.REACT_APP_BE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setHTML(html);
  }, [editorState]);

  const [postInfo, setPostInfo] = useState({
    category: "",
    title: "",
    cover: "",
    readTime: {
      value: 2,
      unit: "minute",
    },
    author: {
      name: "Erik",
      avatar:
        "https://whatsondisneyplus.com/wp-content/uploads/2022/12/spiderman.png",
    },
    content: "",
  });

  const [postCover, setPostCover] = useState();

  console.log(postInfo);
  console.log(postCover);

  const postBlogPost = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${apiUrl}/blogPosts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postInfo),
      });
      const blogPost = await response.json();
      if (response.ok) {
        postCoverPost(blogPost._id);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  const postCoverPost = async (postId) => {
    try {
      const data = new FormData();
      data.append("cover", postCover);
      console.log("put url", `${apiUrl}/file/cover/${postId}`);
      const res = await fetch(`${apiUrl}/file/cover/${postId}`, {
        method: "PUT",
        body: data,
      });

      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  const sendMail = async () => {
    try {
      const response = await fetch(
        (`${apiUrl}/authors/sendMail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authorMail),
        })
      );

      return await response.json();
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            onChange={(event) =>
              setPostInfo({ ...postInfo, title: event.target.value })
            }
            value={postInfo.title}
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            onChange={(event) =>
              setPostInfo({ ...postInfo, category: event.target.value })
            }
            value={postInfo.category}
          >
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>

          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(event) =>
              setPostInfo({ ...postInfo, content: event.target.value })
            }
            value={postInfo.content}
          ></textarea>
        </Form.Group>
        <Form.Label className="mt-3">Upload Cover</Form.Label>
        <Form.Control
          type="file"
          onChange={(event) => setPostCover(event.target.files[0])}
        />
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            onClick={(event) => {
              event.preventDefault();
              sendMail();
              postBlogPost();
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
