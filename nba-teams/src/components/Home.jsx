import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [teams, setTeams] = useState([]);
  const [visibleTeams, setVisibleTeams] = useState(10); 

  useEffect(() => {
    axios.get('http://localhost:3000/teams')
      .then(response => {
        console.log('Received teams:', response.data);
        setTeams(response.data);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);

  const handleViewMore = () => {
    setVisibleTeams(prevVisibleTeams => prevVisibleTeams + 10); // Increase visible teams by 10
  };

  return (
    <>
      <div className="header">
        <header>
          <h1>NBA Stats</h1>
        </header>
      </div>
      <div className="teams-container">
        {teams.slice(0, visibleTeams).map((team, index) => (
          <div className="team-container" key={index}>
            {/* <img src={`/logos/${team.logo}`} alt={team.NBA_Team} /> */}
            {team.NBA_Team}
          </div>
        ))}
      </div>
      {teams.length > visibleTeams && (
        <button className="view-more-btn" onClick={handleViewMore}>View More Teams</button>
      )}
    </>
  );
}

export default Home;
