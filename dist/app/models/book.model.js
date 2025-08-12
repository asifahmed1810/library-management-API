"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    copies: {
        type: Number,
        require: [true, 'Number of copies are required'],
        min: [0, 'Copies can not be negative']
    },
    available: {
        type: Boolean,
        require: true,
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Books = (0, mongoose_1.model)('Books', bookSchema);
