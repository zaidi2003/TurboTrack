import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";


const EmployeeAddTrack = () => {
    
    const { userData, loading } = useUser();
    if (loading) return <div>Loading...</div>;
    if(userData.role==="Customer")
        return <Navigate to="/dashboard" replace />;
   

    const [trackName, setTrackName] = useState("");
    const [subtracks, setSubtracks] = useState([
        { name: "", cost: 500, distance: "", difficulty: "" },
        { name: "", cost: 500, distance: "", difficulty: "" },
        { name: "", cost: 500, distance: "", difficulty: "" },
    ]);

    const handleSubtrackChange = (index, field, value) => {
        const updatedSubtracks = [...subtracks];
        updatedSubtracks[index][field] = field === "cost" || field === "distance" ? Number(value) : value;
        setSubtracks(updatedSubtracks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTrack = {
            trackName,
            subtracks: subtracks.map((subtrack) => ({
                name: subtrack.name,
                distance: subtrack.distance,
                difficulty: subtrack.difficulty,
                cost: subtrack.cost,
            })),
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tracks/create`, newTrack);
            console.log("Track created successfully:", response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        // Reset form
        setTrackName("");
        setSubtracks([
            { name: "", cost: 500, distance: "", difficulty: "" },
            { name: "", cost: 500, distance: "", difficulty: "" },
            { name: "", cost: 500, distance: "", difficulty: "" },
        ]);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Add New Track</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>
                        Track Name:
                        <input
                            type="text"
                            value={trackName}
                            onChange={(e) => setTrackName(e.target.value)}
                            required
                            style={{ marginLeft: "10px" }}
                        />
                    </label>
                </div>
                <h3>Subtracks</h3>
                {subtracks.map((subtrack, index) => (
                    <div key={index} style={{ marginBottom: "15px" }}>
                        <h4>Subtrack {index + 1}</h4>
                        <div style={{ marginBottom: "10px" }}>
                            <label>
                                Subtrack Name:
                                <input
                                    type="text"
                                    value={subtrack.name}
                                    onChange={(e) =>
                                        handleSubtrackChange(index, "name", e.target.value)
                                    }
                                    required
                                    style={{ marginLeft: "10px" }}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>
                                Distance (km):
                                <input
                                    type="number"
                                    value={subtrack.distance}
                                    onChange={(e) =>
                                        handleSubtrackChange(index, "distance", e.target.value)
                                    }
                                    required
                                    style={{ marginLeft: "10px" }}
                                    step="0.1"
                                    min="0"
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>
                                Difficulty:
                                <select
                                    value={subtrack.difficulty}
                                    onChange={(e) =>
                                        handleSubtrackChange(index, "difficulty", e.target.value)
                                    }
                                    required
                                    style={{ marginLeft: "10px" }}
                                >
                                    <option value="">Select</option>
                                    <option value="easy">Easy</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="difficult">Difficult</option>
                                </select>
                            </label>
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <label>
                                Cost (₹):
                                <input
                                    type="number"
                                    value={subtrack.cost}
                                    onChange={(e) =>
                                        handleSubtrackChange(index, "cost", e.target.value)
                                    }
                                    required
                                    style={{ marginLeft: "10px" }}
                                    min="0"
                                />
                            </label>
                        </div>
                    </div>
                ))}
                <button type="submit" style={{ marginTop: "10px" }}>
                    Add Track
                </button>
            </form>
        </div>
    );
};

export default EmployeeAddTrack;
