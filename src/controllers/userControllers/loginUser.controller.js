import { generateAccessToken } from "../../utils/generateAccessToken.js";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const loginUser = asyncHandler(async (request, response) => {
    const {email, password} = request.body;

    if(!email || !password){
        throw new apiError(404, "All fields are required")
    }

    const foundUser = await User.findOne({email});

    if(!foundUser){
        throw new apiError(404, "User with this email does not exists")
    }

    const isValidPassword = await foundUser.isPasswordCorrect(password);

    if(!isValidPassword){
        throw new apiError(401, "Password is incorrect")
    }

    const userId = foundUser._id;

    const accessToken = await generateAccessToken(userId);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    }

    const loggedInUser = await User.findById(userId).select("-password -accessToken")

    return response.status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new apiResponse(200, loggedInUser, "Login successfully")
    )
});

export {loginUser}