import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [field, setField] = useState({
    firstName:"",
    lastName:"",
    email:"",
    mobile:""
  });

  const [submitted, setSubmit] = useState(false);
  const [validate, setValidation] = useState(false);

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={(e)=>{e.preventDefault();
        if(field.firstName && field.lastName && field.email && field.mobile)setValidation(true);
        setSubmit(true)}}>

        {submitted && validate?<div className="success-message">You have successfully registered ✅</div>:null}

        <input
          id="user-name"
          className="form-field"
          type="text"
          placeholder="User Name"
          name="firstName"
          value={field.username}
          onChange={(e)=>{setField({...field, firstName:e.target.value})}}
        />

        {submitted && !field.firstName ?<span>Please enter your Username</span>:null}
       
        <input
          id="email"
          className="form-field"
          type="text"
          placeholder="Email"
          name="email"
          value={field.email}
          onChange={(e)=>{setField({...field, email:e.target.value})}}
        />

        {submitted && !field.email ?<span>Please enter your email</span>:null}

        <button className="form-field" type="submit">
          🎊 Regitser 🎊
        </button>
      </form>
    </div>
  );
}