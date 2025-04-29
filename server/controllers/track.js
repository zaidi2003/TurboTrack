const express = require('express');
const Track = require('../models/tracks'); // Assuming you have a Track model

const getAllTracks = async (req, res) => {
    try {
        const tracks = await Track.find(); // Fetch all tracks from the database
        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tracks', error });
    }
};

const getAllTrackNames = async (req, res) => {
    try {
        const trackNames = await Track.find({}, 'name'); // Fetch only the 'name' field of all tracks
        res.status(200).json(trackNames);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching track names', error });
    }
};

const getTrackbyName = async (req, res) => {
    const { trackName } = req.params; 

    try {
        const track = await Track.findOne({ trackName: trackName }); // Find the track by name
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        res.status(200).json(track);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching track', error });
    }
}

const createTrackDummy = async (req, res) => {
    const defaultTrack = new Track({
        trackID: "track-1",
        trackName: "2F2F",
        subtracks: [
            {
                subtrackID: "subtrack-1",
                subtrackName: "Novice Loop",
                length: "1.2 km",
                difficulty: "easy",
            },
            {
                subtrackID: "subtrack-2",
                subtrackName: "Advanced Loop",
                length: "3.5 km",
                difficulty: "difficult",
            },
            {
                subtrackID: "subtrack-3",
                subtrackName: "Expert Loop",
                length: "5.0 km",
                difficulty: "expert",
            },
        ],
    });

    try {
        const savedTrack = await defaultTrack.save();
        res.status(201).json({
            message: "Track created successfully",
            track: savedTrack,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating track",
            error: error.message,
        });
    }
};

const createTrack = async (req, res) => {
    const { trackName, subtracks } = req.body;

    // You can validate the data here if needed
    if (!trackName || !subtracks || subtracks.length === 0) {
        return res.status(400).json({
            message: "Track name and subtracks are required",
        });
    }

    // Create the track with dynamic data
    const newTrack = new Track({
        trackName: trackName,
        subtracks: subtracks.map((subtrack, index) => ({
            subtrackName: subtrack.name,
            length: subtrack.distance, // Assuming the distance is the length
            difficulty: subtrack.difficulty, // You can add the difficulty field from the form later
            cost: subtrack.cost,
        })),
    });

    try {
        const savedTrack = await newTrack.save();
        res.status(201).json({
            message: "Track created successfully",
            track: savedTrack,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating track",
            error: error.message,
        });
    }
};





module.exports = { getAllTracks, getAllTrackNames, createTrack, createTrackDummy, getTrackbyName };