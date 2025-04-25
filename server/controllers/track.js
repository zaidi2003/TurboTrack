const express = require('express');
const Track = require('../models/tracks'); // Assuming you have a Track model

// Controller function to get all tracks
const getAllTracks = async (req, res) => {
    try {
        const tracks = await Track.find(); // Fetch all tracks from the database
        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tracks', error });
    }
};

// Controller function to get all track names
const getAllTrackNames = async (req, res) => {
    try {
        const trackNames = await Track.find({}, 'name'); // Fetch only the 'name' field of all tracks
        res.status(200).json(trackNames);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching track names', error });
    }
};

const createTrack = async (req, res) => {
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

module.exports = { getAllTracks, getAllTrackNames, createTrack };