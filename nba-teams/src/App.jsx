import React from 'react';
import './App.css';
import TeamStatsComponent from './TeamStats';
import data from './NBA_stats.json'; // Importing the JSON data

function App() {
  return (
    <div className="app">
      <div className="header">
        <header>
          <h1>NBA Stats</h1>
        </header>
      </div>
      <div className="teams-container">
        {data.map((team, index) => (
          <TeamStatsComponent key={index} team={team} />
        ))}
      </div>
    </div>
  );
}

export default App;
