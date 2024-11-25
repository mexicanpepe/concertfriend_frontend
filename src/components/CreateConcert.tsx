import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createConcert } from "../services/concertService";

const CreateConcert: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    venue: "",
    date: "",
    setlist: "",
    media: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createConcert({
      artist_id: Number(artistId),
      //this is the default user ID
      user_id: 1,
      ...formData,
    })
      .then(() => {
        alert("Concert created successfully.");
        navigate("/concerts");
      })
      .catch((error) => console.error("Error creating concert:", error));
  };

  return (
    <div>
      <h2>Create Concert</h2>
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
          Submit
        </button>
        <button
          className="btn btn-secondary mt-3 ms-2"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateConcert;
