import React from "react";

function Comment(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mb-4 mb-sm-5">
                    <div>
                        <h6 className="mb-0">{props.comment.name}</h6>
                        <p>{props.comment.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;