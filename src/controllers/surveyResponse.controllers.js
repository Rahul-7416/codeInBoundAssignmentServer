import { SurveyResponse } from "../models/surveyResponse.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const saveSurveyResponse = asyncHandler( async (req, res) => {
    const { sessionId, questionId, answer } = req.body; // Note: for sessionId, questionId -> send their _id -> their ObjectId, not their string values -> as in surveyResponse model we are using ObjectId to store 
    
    if (
        [sessionId, questionId, answer].some((field) => 
        field === undefined || field.trim === "")
    ) {
        throw new ApiError(400, "All fields are required to create the survey Response");
    }

    const response = await SurveyResponse.create(
        {
            sessionId,
            questionId,
            answer
        }
    )

    const isResponseCreated = await SurveyResponse.findById(response._id);

    if (!isResponseCreated) {
        throw new ApiError(500, "Something went wrong while storing the answer");
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            response,
            "Answer stored successfully"
        )
    )
});

export { saveSurveyResponse }