import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { EmployeeSideNavBar, UserProfile } from "../components";
import { toast } from 'react-toastify';

const EmployeeAddTrack = () => {
  const { userData, loading } = useUser();
  if (loading) return <div>Loading...</div>;
  if (userData.role === "Customer") return <Navigate to="/dashboard" replace />;

  const [trackName, setTrackName] = useState("");
  const [subtracks, setSubtracks] = useState([
    { name: "", cost: 500, distance: "", difficulty: "" },
    { name: "", cost: 500, distance: "", difficulty: "" },
    { name: "", cost: 500, distance: "", difficulty: "" },
  ]);

  const handleSubtrackChange = (index, field, value) => {
    const updated = [...subtracks];
    updated[index][field] = field === "cost" || field === "distance" ? Number(value) : value;
    setSubtracks(updated);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTrack = {
      trackName,
      subtracks: subtracks.map((s) => ({
        name: s.name,
        distance: s.distance,
        difficulty: s.difficulty,
        cost: s.cost,
      })),
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tracks/create`, newTrack);
        toast.success("Track created successfully!");
        navigate("/dashboard");
    } catch (error) {
    }

    // Reset
    setTrackName("");
    setSubtracks([
      { name: "", cost: 500, distance: "", difficulty: "" },
      { name: "", cost: 500, distance: "", difficulty: "" },
      { name: "", cost: 500, distance: "", difficulty: "" },
    ]);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "982px",
        position: "relative",
        background: "linear-gradient(90deg, black 26%, #1B1B1B 53%, #1F1F1F 74%, #242424 83%, #272727 93%)",
        overflow: "hidden",
        paddingBottom: "40px",
        fontFamily: "Readex Pro, sans-serif",
        color: "#f7f4f1",
      }}
    >
      <EmployeeSideNavBar/>
      <UserProfile style={{ position: "absolute", top: 30, right: 40 }} />

      <div
        style={{
          position: "absolute",
          left: 363,
          top: 133,
          color: "#C9C0C0",
          fontSize: 23,
          fontWeight: "550",
          marginBottom: 30,
        }}
      >
        Add New Track
      </div>

      <div
        style={{
          position: "absolute",
          left: 363,
          top: 200,
          width: "calc(100% - 400px)",
          maxWidth: "1200px",
          zIndex: 5,
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: 20,
          padding: 30,
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: 16 }}>
              Track Name:
              <input
                type="text"
                value={trackName}
                onChange={(e) => setTrackName(e.target.value)}
                required
                style={{
                  marginLeft: "10px",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#333",
                  color: "#fff",
                }}
              />
            </label>
          </div>

          <div style={{ marginBottom: "20px", fontSize: 18, fontWeight: 600 }}>Subtracks</div>
          {subtracks.map((subtrack, index) => (
            <div key={index} style={{ marginBottom: "25px", paddingLeft: 15 }}>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Subtrack {index + 1}</div>

              <div style={{ marginTop: "10px" }}>
                <label>
                  Name:
                  <input
                    type="text"
                    value={subtrack.name}
                    onChange={(e) => handleSubtrackChange(index, "name", e.target.value)}
                    required
                    style={{
                      marginLeft: "10px",
                      padding: "6px",
                      background: "#333",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  />
                </label>
              </div>

              <div style={{ marginTop: "10px" }}>
                <label>
                  Distance (km):
                  <input
                    type="number"
                    value={subtrack.distance}
                    onChange={(e) => handleSubtrackChange(index, "distance", e.target.value)}
                    required
                    step="0.1"
                    min="0"
                    style={{
                      marginLeft: "10px",
                      padding: "6px",
                      background: "#333",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  />
                </label>
              </div>

              <div style={{ marginTop: "10px" }}>
                <label>
                  Difficulty:
                  <select
                    value={subtrack.difficulty}
                    onChange={(e) => handleSubtrackChange(index, "difficulty", e.target.value)}
                    required
                    style={{
                      marginLeft: "10px",
                      padding: "6px",
                      background: "#333",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    <option value="">Select</option>
                    <option value="easy">Easy</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="difficult">Difficult</option>
                  </select>
                </label>
              </div>

              <div style={{ marginTop: "10px" }}>
                <label>
                  Cost (Rs):
                  <input
                    type="number"
                    value={subtrack.cost}
                    onChange={(e) => handleSubtrackChange(index, "cost", e.target.value)}
                    required
                    min="0"
                    style={{
                      marginLeft: "10px",
                      padding: "6px",
                      background: "#333",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  />
                </label>
              </div>
            </div>
          ))}

          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#B81515",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Add Track
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeAddTrack;
