import React, { useEffect, useState } from "react";
import { getConcerts, deleteConcert } from "../services/concertService";
import { useNavigate } from "react-router-dom";

const ListConcerts: React.FC = () => {
  const [concerts, setConcerts] = useState<
    { concert_id: number; venue: string; date: string }[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    getConcerts()
      .then((response) => setConcerts(response.data))
      .catch((error) => console.error("Error fetching concerts:", error));
  }, []);

  const handleDelete = (concertId: number) => {
    if (window.confirm("Are you sure you want to delete this concert?")) {
      deleteConcert(concertId)
        .then(() => {
          alert("Concert deleted successfully.");
          setConcerts((prev) =>
            prev.filter((concert) => concert.concert_id !== concertId)
          );
        })
        .catch((error) => console.error("Error deleting concert:", error));
    }
  };

  const editConcert = (concertId: number) => {
    navigate(`/edit-concert/${concertId}`);
  };

  return (
    <div>
      <h2>Concerts</h2>
      <ul className="list-group">
        {concerts.map((concert) => (
          <li
            key={concert.concert_id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {concert.venue} - {concert.date}
            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => editConcert(concert.concert_id)}
              >
                +
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(concert.concert_id)}
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListConcerts;
