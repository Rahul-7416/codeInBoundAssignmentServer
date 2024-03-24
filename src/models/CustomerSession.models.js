import mongoose from "mongoose";

const customerSessionSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
            unique: true
        },
        startedAt: {
            type: Date,
            default: Date.now
        },
        completed: {
            type: Boolean,
            default: false
        }
    }
);

export const CustomerSession = mongoose.model("CustomerSession", customerSessionSchema, "CustomerSessions");