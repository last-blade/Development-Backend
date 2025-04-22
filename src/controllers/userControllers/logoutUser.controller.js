import jwt from "jsonwebtoken";
import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const logoutUser = asyncHandler(async (request, response) => {
    const accessToken = request?.cookies;

    if(!accessToken){
        throw new apiError(404, "Unauthorized action denied, please login again")
    }

    let decodedToken;

    try {
        decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    } catch (error) {
        throw new apiError(401, "Something went wrong")
    }

    if(!decodedToken){
        throw new apiError(404, "Invalid access token")
    }

    const userId = decodedToken?.id;

    const foundUser = await User.findById(userId);

    if(!foundUser){
        throw new apiError(404, "User not found")
    }

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",  
        path: "/",         
    };

    return response.status(200)
    .clearCookie("accessToken", options)
    .json(
        new apiResponse(200, {}, "Logout successfully")
    )
    
});

export {logoutUser}