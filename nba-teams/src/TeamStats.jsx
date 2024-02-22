import React from 'react';
import './TeamStats.css'

const TeamStatsComponent = ({ team }) => {
    return (
        <div className="team">
            <h2>{team["NBA Team"]}</h2>
            <p>Number of League Titles Won: {team["Number of League Titles Won"]}</p>
            <p>Longest Winning Streak: {team["Longest Winning Streak"]}</p>
        </div>
    );
};

export default TeamStatsComponent;