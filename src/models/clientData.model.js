import mongoose, { Schema } from "mongoose";

const clientDataSchema = new Schema({
    material: {
        type: String,
        required: true,
    },

    t1: {
        type: String,
        required: true,
    },
    materialDescription: {
        type: String,
        required: true,
    },

    flameAdhesive: {
        type: String,
        required: true,
    },

    colorway: {
        type: String,
        required: true,
    },

    width: {
        type: String,
        required: true,
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

}, {timestamps: true});

export const Client = mongoose.model("Client", clientDataSchema);