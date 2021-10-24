
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUser] = useState();
  const nameRef = useRef();
  const emailRef =useRef();

 useEffect( ()=>{
   fetch('http://localhost:4000/users')
   .then(res => res.json())
   .then(data=> setUser(data))
 } , [])



const handleAddUsers = e =>{
  e.preventDefault();
  
  console.log(nameRef.current)
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = {name: name, email: email};

    // Send Data to the server 
    fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data)
      const addedUser = data;
      const newUsers = [...users, addedUser];
      setUser(newUsers)
    })
    nameRef.current.value = '';
    emailRef.current.value = '';
}


  return (
    <div className="App">
      <h1> length: {users?.length}</h1>
      <div>Add New User</div>
      <form onSubmit={handleAddUsers}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input type="email" name="" placeholder="name" ref={emailRef} id="" />
        <input type="submit" value="submit" />
      </form>
     <ul>
       {
         users?.map(user=> <li key={user.id}>Name: {user?.name}</li>)
       }
     </ul>
    </div>
  );
}

export default App;
