import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import "./App.css"

export default function Navbar() {
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
        style={{ width: '150px', color: 'white', backgroundColor: 'purple' }}>
      <b>View Your Teams</b>
      </Button>       
        <Button
        component={Link}
        to="/Form"
        variant="contained"
        className="add-team-button"
        style={{ width: '150px', color: 'white',backgroundColor: 'black' }}
        >
        <b>Add Your Team</b>
        </Button>

      </div>
    </nav>
  );
}
