import React, { useState, useContext } from "react";
import axios from "axios";


import MovieContext from '../MovieContext';

function PostComment(props) {
    const { movie } = useContext(MovieContext);

    const [comment, setComment] = useState({
        episode: movie.episode,
        name: "",
        content: "",
    });

    async function commentSubmit(event) {
        event.preventDefault();
        setComment({
            episode: movie.episode,
            name: "",
            content: "",
        });
        try {
            const response = await axios.post('/postComment', { comment: comment });
            if (response.status === 200) {
                console.log("hey there");
                props.reloadComments();
            } else {
                console.error("Error while extracting posts from database: " + response.status);
            }
        } catch (err) {
            console.error("Error in axios call: " + err.message);
        }
    }

    function fieldListener(event) {
        const { value, name } = event.target;
        setComment((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    return (
        <div className="container">
            <form onSubmit={commentSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={fieldListener} value={comment.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Comment</label>
                    <textarea className="form-control" name="content" id="content" rows="3" onChange={fieldListener} value={comment.content} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    );
}

export default PostComment;