import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

const BlogPostComments = ({ blogId }) => {
  const [allComments, setAllComments] = useState();
  const [loading, setLoading] = useState(true);

  const [commentVal, setCommentVal] = useState({
    creator: "John Doe",
    comment: "",
    likes: 0,
  });

  useEffect(() => {
    getComments();
  }, []);

  const apiUrl = process.env.REACT_APP_BE_URL;

  const postComment = async () => {
    try {
      const response = await fetch(`${apiUrl}/comments/${blogId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentVal),
      });
      setCommentVal({
        creator: "John Doe",
        comment: "",
        likes: 0,
      });
      getComments();
      return await response.json();
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  const getComments = async () => {
    try {
      const res = await fetch(`${apiUrl}/comments/blogComments/${blogId}`);
      const data = await res.json();
      if (res.ok) {
        setAllComments(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="write a comment..."
            value={commentVal.comment}
            onChange={(event) => {
              setCommentVal({ ...commentVal, comment: event.target.value });
            }}
          />
        </Form.Group>
        <Button
          variant="outline-primary"
          onClick={() => {
            postComment();
          }}
        >
          Add Comment
        </Button>
      </Form>
      {allComments !== undefined &&
        allComments.map((comment) => {
          return (
            <div className="comment-holder d-flex flex-column" key={comment.id}>
              <h4>{comment.creator}:</h4>
              <p>{comment.comment}</p>
              <span className="comment-like">Likes:{comment.likes}</span>
            </div>
          );
        })}
    </>
  );
};

export default BlogPostComments;
