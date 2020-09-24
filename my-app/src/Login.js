import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import schema from './schema'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const StyledSignUp = styled.div`
    form{
        width: 60%;
        display: flex;
        margin: 0 auto;
        flex-flow: column;
        
    }
    input{
        width: 30%;
        display: flex;
        margin: 2% auto;
        text-align: center;
        padding: 0.8%;
        border: 3px solid #191970;
    }
    input:hover{
      transform: scale(1.3);
    }

    .pw{
        margin-bottom: 5%;
    }
    h2{
        margin: 5% 0;
        margin-bottom: 5%;
        justify-self: center;
    }

    button{
        width: 15%;
        margin: 0 auto;
        text-align: center;
        padding: 1%;
        margin-bottom: 2%;
        border: 3px solid #191970;
        font-weight: bold;
    }
    button:hover{
        background-color: #191970;
        color: white;
        transition: 1s;
    }
    h3{
        font-size: 1rem;
        color: red;
    }
    label{
        font-size: 1.2em;
        font-weight: bold;
    }

    .container{
        display:flex;
        flex-flow:column;
        padding: 2%;
        height: 100vh;
        background-image: url("https://wp-media.petersons.com/blog/wp-content/uploads/2020/05/01182219/iStock-486552677.jpg");
        background-image: no-repeat;
        background-size: cover;    
        justify-content: center;
        opacity: 0.8;
    }
    .clickLink{
        text-decoration: none;
        color: blue;
    }
    .signin{
        font-size: 8em;
    }

    a{
        font-size: 0.8rem;
        text-align: center;
        text-decoration: none;
    }
    a:visited{
        text-decoration: none;
    }
`

const Login = (props) => {

    const {formValue,
            setFormValue,
            errors,
            setErrors,
            style
        } = props;

    const [user, setUser] = useState([])

    useEffect(() => {
        const getUser = () => {
            axios.get("https://reqres.in/api/user")
            .then(res => {
                setUser(res.data.data)
                console.log(res.data.data)
            })
            .catch(err => {
                debugger
            })
        }
        getUser()
    },[])

    const initialFormValue = {
        name: "",
        password: ""
    }
    
    const postUserData = newUser => {
        axios.post("https://reqres.in/api/user", newUser)
             .then(res => {
                 setUser([...user, res.data])
                setFormValue(initialFormValue)
                 console.log(res.data)
             })
            .catch(err => {
                debugger
              })
    }

    const formSubmit = () => {
        const newUser = {
            name: formValue.name.trim(), 
            password: formValue.password.trim(), 
        
        }
        postUserData(newUser)
    }

    

    

    const validate = (event) => {
        yup
        .reach(schema, event.target.name)
        .validate(event.target.value)
        .then(valid => {
            setErrors({
                ...errors,
                [event.target.name] : ""
               
            })
        })
        .catch(err => {
            setErrors({
                ...errors,
                [event.target.name] : err.errors[0]
               
            })
        })
    }
    
    const onSubmit = (event) => {
        event.preventDefault()
        setFormValue(formValue)
        formSubmit()
        
    }

    const inputChange = (event) => {
        event.persist()
        validate(event)
        setFormValue({...formValue, [event.target.name] : event.target.value})
    }
    
   


    return (
        <StyledSignUp>
        <div className="container">
            
            <form onSubmit={onSubmit}>
                <h2 className="signin">Sign In</h2>
                <h3>{errors.name}</h3>
                <h3>{errors.password}</h3>

                <label> Name
                    <input 
                    type='text'
                    placeholder="Your Name"
                    name="name"
                    value={formValue.name}
                    onChange={inputChange}

                    />
                </label>


                <label className="pw"> Password
                    <input 
                    type='password'
                    placeholder="Your Password"
                    name="password"
                    value={formValue.password}
                    onChange={inputChange}
                    
                    />
                </label>

                <button>Sign in</button>
                <Link to="/" className="clickLink">Not registered? Click here to Sign up!</Link>

            </form>
        </div>
        </StyledSignUp>
    )
}

export default Login