import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getConcertById, updateConcert } from "../services/concertService";

const EditConcert: React.FC = () => {
  const { concertId } = useParams<{ concertId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    artist_id: 0,
    venue: "",
    date: "",
    setlist: "",
    media: "",
  });

  useEffect(() => {
    getConcertById(Number(concertId))
      .then((response) => setFormData(response.data[0]))
      .catch((error) => console.error("Error fetching concert:", error));
  }, [concertId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConcert({ concert_id: Number(concertId), ...formData })
      .then(() => {
        alert("Concert updated successfully.");
        navigate("/concerts");
      })
      .catch((error) => console.error("Error updating concert:", error));
  };

  return (
    <div>
      <h2>Edit Concert</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Venue</label>
          <input
            type="text"
            className="form-control"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Setlist</label>
          <textarea
            className="form-control"
            value={formData.setlist}
            onChange={(e) =>
              setFormData({ ...formData, setlist: e.target.value })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label>Media</label>
          <input
            type="text"
            className="form-control"
            value={formData.media}
            onChange={(e) => setFormData({ ...formData, media: e.target.value })}
          />
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Save
        </button>
        <button
          className="btn btn-secondary mt-3 ms-2"
          onClick={() => navigate("/concerts")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditConcert;
