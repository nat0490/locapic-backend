const mongoose = require('mongoose');

const markersSchema = mongoose.Schema({
    nickname: String,
    name: String,
    latitude: Number,
    longitude: Number,
})

/*
const userSchema = mongoose.Schema({
    nickname: String,
    markers: markersSchema,
})*/

const Marker = mongoose.model('markers', markersSchema);

module.exports = Marker;