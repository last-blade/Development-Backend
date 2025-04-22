import { User } from "../models/user.model.js";

const generateAccessToken = async (userId) => {
    const foundUser = await User.findById(userId);
    const accessToken = await foundUser.generateAccessToken();
    return accessToken;
};

export {generateAccessToken}