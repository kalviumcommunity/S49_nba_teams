import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Myteams.css';
import axios from 'axios';

function Myteams({ selectedUser }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://nba-teams-y83o.onrender.com/createteam')
      .then(result => {
        setTeams(result.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (teams.length === 0) return <div>No teams found.</div>;

  const handleDelete = (id) => {
    axios.delete(`https://nba-teams-y83o.onrender.com/deleteteam/` + id)
      .then(res => {
        window.location.reload();
      })
      .catch(errr => console.log(errr));
  };

  return (
    <div>
      <h1>Ash Boi'sTeams</h1>
      {teams.map(team => (
        <div className="card" key={team._id}>
          <h2>{team.Team_Name}</h2>
          <p>Location: {team.Rep_City}</p>
          <p>Conference: {team.Conference}</p>
          <div className="buttons">
            {/* <button><Link to={`/update`}>Edit</Link></button> */}
            <button><Link to={`/update/${team._id}`}>Edit</Link></button>
            <button onClick={(e) => handleDelete(team._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Myteams;
