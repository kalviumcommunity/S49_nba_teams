
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'; 
import "./App.css";

export default function Navbar({ setSelectedUser }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://nba-teams-y83o.onrender.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); 

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <nav className="nav">
      <Link to="/">
        <b className="site-title">NBA.stats</b>
      </Link>
      <div className="nav-links">
      <Button
          component={Link}
          to="/Home"
          variant="contained"
          className="stat-button"
          style={{ width: '150px', color: 'black', backgroundColor: 'white' }}
        >
          <b>View Team Stats</b>
        </Button>
        <Button
          component={Link}
          to="/MyTeams"
          variant="contained"
          className="team-button"
          style={{ width: '150px', color: 'white', backgroundColor: 'purple' }}
        >
          <b>View Your Teams</b>
        </Button>       
        {isLoggedIn ? (
          <Button
            variant="contained"
            className="logout-button"
            style={{ width: '150px', color: 'black', backgroundColor: 'white' }}
            onClick={handleLogout}
          >
            <b>Logout</b>
          </Button>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            className="login-button"
            style={{ width: '150px', color: 'black', backgroundColor: 'white' }}
          >
            <b>Login</b>
          </Button>
        )}
        <Button
          component={Link}
          to="/Form"
          variant="contained"
          className="login"
          style={{ width: '150px', color: 'white', backgroundColor: 'black' }}
        >
          <b>Add Your Team</b>
        </Button>

        {/* Dropdown menu */}
        <Box sx={{ minWidth: 120, marginLeft: '10px' }}>
          <FormControl fullWidth>
            <InputLabel id="user-select-label">Select User</InputLabel>
            <Select
              labelId="user-select-label"
              id="user-select"
              onChange={handleChange}
              label="Select User"
            >
              {users.map(user => (
                <MenuItem key={user._id} value={user}>
                  {user.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

      </div>
    </nav>
  );
}
