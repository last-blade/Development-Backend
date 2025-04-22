import { generateAccessToken } from "../../utils/generateAccessToken.js";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const loginUser = asyncHandler(async (request, response) => {
    const {email, password} = request.body;

    if(!email || !password){
        throw new apiError(404, "All fields are required")
    }

    const foundUser = await User.findOne({email}).select("-password -accessToken");

    if(!foundUser){
        throw new apiError(404, "User with this email does not exists")
    }

    const userId = foundUser._id;

    const accessToken = generateAccessToken(userId);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    }

    return response.status(200)
    .cookie("accessToken", accessToken, options)
    .json(
        new apiResponse(200, foundUser, "Login successfully")
    )
});

export {loginUser}