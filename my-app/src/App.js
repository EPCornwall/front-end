import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './SignUp'
import Login from './Login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function App() {
  
    const [formValue, setFormValue] = useState({
      name: "",
      password: "",
      email: "",
      cbx: false

  })

  const [errors, setErrors] = useState({
      name: "",
      password: "",
      email: ""

  })


  return (
    <div className="App">
    <Route exact path="/">
      <SignUp 
        formValue={formValue}
        setFormValue={setFormValue}
        errors={errors} 
        setErrors={setErrors}
      />
    </Route>

    <Route path="/Login">
      <Login 
        formValue={formValue}
        setFormValue={setFormValue}
        errors={errors} 
        setErrors={setErrors}
      />
    </Route>

    </div>
  );
}

export default App;
