import Navbar from "./Header"
import Form from "./components/Form"
import Landing from "./components/Landing"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Myteams from "./components/Myteams"
import Update from './components/Update';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Form" element={<Form />} />
          <Route path = "/Home" element = {<Home />}/>
          <Route path = "/MyTeams" element = {<Myteams/>}/>
          <Route path = "/Update/:id" element = {<Update/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App