import React, { useEffect, useState } from "react";
import { getArtists } from "../services/concertService";
import { useNavigate } from "react-router-dom";

const ListArtists: React.FC = () => {
  const [artists, setArtists] = useState<{ artist_id: number; name: string }[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    getArtists()
      .then((response) => setArtists(response.data))
      .catch((error) => console.error("Error fetching artists:", error));
  }, []);

  const createConcert = (artistId: number) => {
    navigate(`/create-concert/${artistId}`);
  };

  return (
    <div>
      <h2>Artists</h2>
      <ul className="list-group">
        {artists.map((artist) => (
          <li
            key={artist.artist_id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {artist.name}
            <button
              className="btn btn-success btn-sm"
              onClick={() => createConcert(artist.artist_id)}
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListArtists;
