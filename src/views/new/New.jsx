import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
const NewBlogPost = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [html, setHTML] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setHTML(html);
  }, [editorState]);

  const [postInfo, setPostInfo] = useState({
    category: "",
    title: "",
    cover:
      "https://media.gq.com/photos/5b9ad94ed02a18036b86da54/master/w_2560,h_1326,c_limit/Screen%20Shot%202018-09-13%20at%204.49.36%20PM.png",
    readTime: {
      value: 2,
      unit: "minute",
    },
    author: {
      name: "Spiderman",
      avatar:
        "https://whatsondisneyplus.com/wp-content/uploads/2022/12/spiderman.png",
    },
    content: "",
  });

  console.log(postInfo);

  const postBlogPost = async () => {
    try {
      const response = await fetch("http://localhost:3001/blogPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postInfo),
      });
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
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(event) =>
              setPostInfo({ ...postInfo, content: event.target.value })
            }
          ></textarea>
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            onClick={(event) => {
              event.preventDefault();
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
