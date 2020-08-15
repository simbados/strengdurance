"use strict";
exports.__esModule = true;
exports.ExerciseSchema = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.ExerciseSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    category: { type: String, required: true }
});
