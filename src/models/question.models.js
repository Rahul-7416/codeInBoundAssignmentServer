import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        text: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["rating5", "rating10", "text"],
            required: true
        },
    }
);

export const Question = mongoose.model("Question", questionSchema, "Questions");