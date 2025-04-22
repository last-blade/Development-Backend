import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const authentication = asyncHandler(async (request, response, next) => {
    try {
            const token = request.cookies?.accessToken;
        
            if(!token){
                throw new apiError(401, "Please login, authentication failed")
            }
        
            let decodedToken;
        
            try {
                decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
            } catch (error) {
                throw new apiError(401, "Unauthorized access denied")
            }
        
            const userId = decodedToken.id;
        
            const foundUser = await User.findById(userId).select("-password");
        
            if(!foundUser){
                throw new apiError(401, "Unauthorized access, login again")
            }
        
            request.user = foundUser;
        
            next();
    } catch (error) {
        throw new apiError(401, "Invalid access token" || error.message)
    }

});

export {authentication}