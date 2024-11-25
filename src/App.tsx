import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/Navbar';
import ListArtists from "./components/ListArtists";
import ListConcerts from "./components/ListConcerts";
import CreateConcert from "./components/CreateConcert";
import EditConcert from "./components/EditConcert";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ListArtists />} />
          <Route path="/concerts" element={<ListConcerts />} />
          <Route path="/create-concert/:artistId" element={<CreateConcert />} />
          <Route path="/edit-concert/:concertId" element={<EditConcert />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
