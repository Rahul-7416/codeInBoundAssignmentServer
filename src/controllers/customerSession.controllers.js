import { CustomerSession } from "../models/CustomerSession.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// const createCustomerSession = asyncHandler( async (req, res) => {
//     const sessionId = req.sessionId;
//     const customerSession = await CustomerSession.create({ sessionId });

//     const isCustomerSessionCreated = await CustomerSession.findById(customerSession._id);

//     if (!isCustomerSessionCreated) {
//         throw new ApiError(500, "Something went wrong while creating customer session")
//     }

//     return res
//     .status(201)
//     .json(
//         new ApiResponse(
//             201,
//             customerSession,
//             "Customer Session created successfully"    
//         )
//     )
// });

// const completeSurvey = asyncHandler(async (req, res) => {
//     const sessionId = req.params.sessionId; // Extract sessionId from the request

//     console.log(sessionId);
//     // Check if the session exists
//     const session = await CustomerSession.findOne({ sessionId });
//     if (!session) {
//         // return res.status(404).json({ success: false, error: "Session not found" });
//         throw new ApiError(400, "Session not found");
//     }

//     // Check if the session is already completed
//     if (session.completed) {
//         throw new ApiError(400, "Session is already completed");
//     }

//     // Check if all survey questions are answered
//     const allQuestionsAnswered = await allQuestionsAnsweredForSession(sessionId);
//     if (!allQuestionsAnswered) {
//         throw new ApiError(400, "All survey questions are not answered yet");
//     }

//     // Update the session's completed field to true
//     session.completed = true;
//     await session.save();

//     return res
//     .status(200)
//     .json(
//         new ApiResponse(
//             200,
//             session,
//             "Survey completed and data is saved successfully"
//         )
//     );
// });

// const allQuestionsAnsweredForSession = async (sessionId) => {
//     // Convert sessionId string to ObjectId
//     const sessionObjectId = new mongoose.Types.ObjectId(sessionId);

//     // Find all distinct questionIds for the given session
//     const distinctQuestionIds = await SurveyResponse.distinct("questionId", { sessionId: sessionObjectId });

//     // Get all questionIds from the Questions collection
//     const allQuestionIds = await Question.find({}, "_id");

//     // Check if there are any unanswered questions by comparing distinctQuestionIds and allQuestionIds
//     const unansweredQuestionIds = allQuestionIds.filter((questionId) => !distinctQuestionIds.includes(questionId.toString()));

//     // If there are no unanswered questions, return true
//     return unansweredQuestionIds.length === 0;
// };

// Controller function to create a new session
const createSession = asyncHandler( async (req, res) => {
    const sessionId = req.sessionId;
    const session = await CustomerSession.create({ sessionId });

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            session,
            "Session created successfully"
        )
    )
});

// Controller function to update session completion status
const updateSessionCompletion = asyncHandler( async (req, res) => {
    const sessionId = req.params.sessionId;
    console.log(sessionId);

    if (!sessionId) {
        throw new ApiError(400, "sessionID is required");
    }
    const session = await CustomerSession.findOneAndUpdate(
        { sessionId },
        { completed: true },
        { new: true }
    );

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            session,
            "survey completed successfully"
        )
    )
});


export { createSession, updateSessionCompletion }