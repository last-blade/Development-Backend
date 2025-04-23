import { apiError, asyncHandler, Client, User } from "../allImports.js";

const createClient = asyncHandler(async (request, response) => {
    const {material, t1, materialDescription, flameAdhesive, colorway, width} = request.body;

    if([material, t1, materialDescription, flameAdhesive, colorway, width].some((inputField) => inputField.trim === "")){
        throw new apiError(404, "All fields are required")
    }

    const createdClient = await Client.create({
        material, 
        t1, 
        materialDescription, 
        flameAdhesive, 
        colorway, 
        width,
        creator: request.user?.id
    });

    const foundClient = await Client.findById(createdClient._id);

    if(!foundClient){
        throw new apiError(500, "Something went wrong, try again")
    }

    const foundUser = await User.findByIdAndUpdate(request.user?.id, {
        $push: {
            clientData: createdClient._id,
        },
    }, {new: true});

    return response.status(201)
    .json(201, createdClient, "Client data created successfully")

});

export { createClient }