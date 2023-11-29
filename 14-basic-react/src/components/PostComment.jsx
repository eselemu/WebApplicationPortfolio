import React, { useState } from "react";

function PostComment(props) {

    const [comment, setComment] = useState({
        name: "",
        content: "",
    });

    function handleSubmit(event) {
        console.log("eh");
        event.preventDefault();
        props.addComment(props.name, comment);
        setComment({ name: "", content: "" });
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
            <form onSubmit={handleSubmit}>
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