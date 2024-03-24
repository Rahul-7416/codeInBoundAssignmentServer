import { Question } from "../models/question.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const postQuestion = asyncHandler( async (req, res) => {

    // extract data from the req.body 
    const {id, text, type} = req.body; 

    console.log(req.body);

    // verify that the received data is non-empty
    if(
        [id, text, type].some((field) => 
        (field !== undefined) && ((typeof field === "string" && (field.trim() === "" || field === null)) || (typeof field === "number" && field === null)) )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // check if the question already exists or not
    const existedQuestion = await Question.findOne({id});

    if (existedQuestion) {
        throw new ApiError(409, "This question already exists");
    }

    // create new question object
    const question = await Question.create({
        id,
        text,
        type,
    });

    const createdQuestion = await Question.findById(question._id);

    if (!createdQuestion) {
        throw new ApiError(500, "Something went wrong while storing the question!");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdQuestion,
            "Question stored successfully"
        )
    );
});

const getAllQuestions = asyncHandler( async (req, res) => {
    const questions = await Question.find();
    if (!questions) {
        throw new ApiError(500, "Something went wrong while fetching the Questions");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            questions,
            "All questions fetched successfully"
        )
    )
})

export {
    postQuestion,
    getAllQuestions,
}