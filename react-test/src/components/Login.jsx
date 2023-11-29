import React, { useState } from "react";
import axios from "axios";

function LogIn(props){
    const [user, setUser] = useState("");
    const [pass, setPass] = useState(""); 
    const [userProfile, setUserProfile] = useState({
        user: "",
        password: "",
    });

    function fieldListener(event){
        const {value, name} = event.target;
        setUserProfile((prevValue) => {
            return{
                ...prevValue,
                [name]: value,
            };
        });
        console.log(userProfile);
    }

    function submitForm(event){
        console.log("user: " + userProfile.user + " password: " + userProfile.password);
        axios.post("/login", {
            user: userProfile.user,
            password: userProfile.password,
        }).then((res) => {
            console.log(res.data);
            if(res.data.statusCode === 1){
                console.log("u are logged");
                props.listener();
            }
        }).catch((err) =>{
            console.log(err);
        });
        event.preventDefault();
    }
    return(
        <div>
            <form onSubmit={submitForm}>
                <input type="text" name="user" id="username" placeholder="Username" onChange={fieldListener} value={userProfile.user}></input>
                <input type="password" name="password" id="password" placeholder="Password" onChange={fieldListener} value={userProfile.password}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LogIn;