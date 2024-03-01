import React from 'react';
import { Route } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "./Landing.css";

export default function Landing() {
  return (
    <div>
      <h1><strong>Popular Teams</strong></h1>
      <div className="container">
      <ActionAreaCard 
        teamName="Golden State Warriors"
        imageUrl="https://c4.wallpaperflare.com/wallpaper/140/142/476/nba-basketball-sports-golden-state-warriors-wallpaper-preview.jpg"
        description="Golden State Warriors revolutionized NBA with their fast-paced 'small ball' style, led by stars like Curry, Thompson, and Green."
      />
      <ActionAreaCard 
        teamName="Miami Heat"
        imageUrl="https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg"
        description="The Miami Heat is known for its aggressive defense and strong teamwork, with iconic players like Wade, James, and Bosh leading the team to multiple championships."
      />
      <ActionAreaCard 
        teamName="Los Angeles Lakers"
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg"
        description="The Los Angeles Lakers, one of the most successful franchises in NBA history, boasts a lineup of legendary players and a tradition of excellence."
      />
      <ActionAreaCard 
        teamName="Boston Celtics"
        imageUrl="https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg"
        description="The Boston Celtics have a rich history of success, with numerous championships won by iconic players like Russell, Bird, and Pierce."
      />
      <ActionAreaCard 
        teamName="Oklahoma City Thunder"
        imageUrl="https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg"
        description="The Oklahoma City Thunder, formerly known as the Seattle SuperSonics, have a loyal fan base and have seen success with players like Durant, Westbrook, and Harden."
      />
      <ActionAreaCard 
        teamName="Chicago Bulls"
        imageUrl="https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg"
        description="The Chicago Bulls, led by Michael Jordan in the 1990s, achieved unprecedented success, winning six NBA championships and capturing the imagination of basketball fans worldwide."
      />
    </div>
     </div>
  );
}

function ActionAreaCard({ teamName, imageUrl, description }) {
  return (
    <Card sx={{ maxWidth: 300 }} className="card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image={imageUrl}
          alt={teamName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {teamName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}