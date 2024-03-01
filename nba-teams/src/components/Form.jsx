import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Form() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()
  const onSubmit = (data) => {
    axios.post('http://localhost:3000/createteam', data)
      .then(result => {
        console.log(result);
        setSubmitted(true);
        reset(); 
        navigate('/Myteams  ')
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        {submitted && <div className="success-message">Team created successfully ✅</div>}
        <input
          id="team-name"
          className="form-field"
          type="text"
          placeholder="Team Name"
          {...register('Team_Name', { required: "Team Name is required!" })}
        />
        <span>{errors.Team_Name?.message}</span>
        <input
          id="city-name"
          className="form-field"
          type="text"
          placeholder="Rep City"
          {...register('Rep_City', { required: "You need to represent a city!" })}
        />
        <span>{errors.Rep_City?.message}</span>
        <input
          id="Conf"
          className="form-field"
          type="text"
          placeholder="Conference (Western or Eastern)"
          {...register('Conference', { required: "You need to be in a Conference!" })}
        />
        <span>{errors.Conference?.message}</span>
        <button className="form-field" type="submit">
          Ballin 🏀
        </button>
      </form>
    </div>
  );
}
