import './App.css';
import AdminConsole from './components/AdminConsole';
import LogIn from './components/Login';
import Archive from './components/Archive';
import Secret from './components/Secret';
import MyNavBar from './components/MyNavBar';
import contacts from './data/data';
import React, {useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [isLogged, setLogged] = useState(false);

  function CheckLogStatus(props){
    return (
      isLogged ? <props.component /> : <Navigate to = "/" />
    );
  }

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

  
  /*allContacts = contacts.map((contact) => (
    <Card 
    name={contact.name} 
    img={contact.picture} 
    phone={contact.phone}/>
  ));*/

  var result = contacts.reduce((result, {age}) =>{
    return result + age;
  },0);

  function updateLogState(){
    setLogged(!isLogged);
  }


  return (
    <div className="App">
      <h1 style={customStyle}>Hello world! Im {name + " " + lname}</h1>
      <p>This is my first react app. My number is {result}</p>
      <img alt='Random image' src={image} />
      <MyNavBar />
      {//isLogged ? <AdminConsole /> : <LogIn listener = {updateLogState}/>
      }
      <Routes>
        <Route path = "/" element = {isLogged ? <Navigate to = "/admin" /> : <LogIn listener = {updateLogState}/>} />
        <Route path = "/admin" element = {<CheckLogStatus component = {AdminConsole}/>} />
        <Route path = "/archive" element = {<CheckLogStatus component = {Archive}/>} />
        <Route path = "/secret" element = {<CheckLogStatus component = {Secret}/>} />
      </Routes>
      <p className='footer'>Copyright {currentDate.getFullYear()}</p>
    </div>
  );
}

export default App;
