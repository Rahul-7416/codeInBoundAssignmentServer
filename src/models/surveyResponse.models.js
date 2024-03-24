import mongoose from "mongoose";

const surveyResponseSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CustomerSession",
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

export const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema, 'SurveyResponses');