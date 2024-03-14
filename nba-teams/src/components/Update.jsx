import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

export default function Update() {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [team, setTeam] = useState({ Team_Name: '', Rep_City: '', Conference: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://nba-teams-y83o.onrender.com/getteam/${id}`)
      .then(result => {
        console.log(result);
        setTeam(result.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const onSubmit = (data) => {
    axios.put(`https://nba-teams-y83o.onrender.com/updateteam/${id}`, data)
      .then(result => {
        console.log(result);
        setSubmitted(true);
        reset();
        navigate('/Myteams');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        {submitted && <div className="success-message">Team updated successfully ✅</div>}
        <input
          id="team-name"
          className="form-field"
          type="text"
          placeholder="New Team Name"
          {...register('Team_Name', { required: "Team Name is required!" })}
          value={team.Team_Name}
          onChange={(e) => setTeam({ ...team, Team_Name: e.target.value })}
        />
        <span>{errors.Team_Name?.message}</span>
        <input
          id="city-name"
          className="form-field"
          type="text"
          placeholder="New Rep City"
          {...register('Rep_City', { required: "You need to represent a city!" })}
          value={team.Rep_City}
          onChange={(e) => setTeam({ ...team, Rep_City: e.target.value })}
        />
        <span>{errors.Rep_City?.message}</span>
        <input
          id="Conf"
          className="form-field"
          type="text"
          placeholder="New Conference (Western or Eastern)"
          {...register('Conference', { required: "You need to be in a Conference!" })}
          value={team.Conference}
          onChange={(e) => setTeam({ ...team, Conference: e.target.value })}
        />
        <span>{errors.Conference?.message}</span>
        <button className="form-field" type="submit">
          Ballin 🏀
        </button>
      </form>
    </div>
  );
}
