import React from "react";

function Header(){
    const customStyle = {
        color: "blue",
        fontSize: "20px",
        border: "1px solid black"
    };
    const num = Math.floor(Math.random()*10);
    const name = "El pepe";
    const lname = "pepoclas";
    const currentDate = new Date();

    if(num % 2 === 0){
        customStyle.background = "gray";
    }else{
        
        customStyle.background = "yellow";
    }

  const image = "http://picsum.photos/200";
    return (
        <div>
            <h1 style={customStyle}>Hello world! Im {name + " " + lname}</h1>
            <p>This is my first react app. My number is {5}</p>
            <img alt='Random image' src={image} />
        </div>
    );
}

export default Header;