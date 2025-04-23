import { apiError, apiResponse, asyncHandler, User } from "../allImports.js";

const registerUser = asyncHandler(async (request, response) => {
    let {fullname, accountType, password, confirmPassword, email} = request.body;

    email = email.toLowerCase(); 

    if (password !== confirmPassword) {
        throw new apiError(400, "Password and confirm password do not match");
    }    

    if([fullname, email, password, confirmPassword, accountType].some((inputField) => inputField?.trim === "")){
        throw new apiError(404, "All fields are required")
    }

    const existedUser = await User.findOne({email});

    if(existedUser){
        throw new apiError(409, "User with this email already exists")
    }

    const createdUser = await User.create({
        email: email.toLowerCase(),
        password,
        fullname,
        accountType
    });

    const foundUser = await User.findById(createdUser._id).select("-password");

    if(!foundUser){
        throw new apiError(500, "Error while creating a user")
    }

    return response.status(200)
    .json(
        new apiResponse(201, foundUser, "User created successfully")
    )
});

export {registerUser}