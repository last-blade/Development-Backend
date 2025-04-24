import { apiResponse, asyncHandler, Client } from "../allImports.js";

const editClient = asyncHandler(async (request, response) => {
    const {clientId} = request.params;

    const {material, t1, materialDescription, flameAdhesive, colorway, width} = request.body;

    if([material, t1, materialDescription, flameAdhesive, colorway, width].some((inputField) => inputField.trim === "")){
        throw new apiError(404, "All fields are required")
    }

    if(!clientId){
        throw new apiError(404, "Client id not found")
    }

    const foundClient = await Client.findById(clientId);

    if(!foundClient){
        throw new apiError(404, "Client data not found")
    }

    const updatedClient = await Client.findByIdAndUpdate(foundClient._id, {
        $set: {
            material, 
            t1, 
            materialDescription, 
            flameAdhesive, 
            colorway, 
            width,
        }
    }, {new: true})

    return response.status(200)
    .json(
        new apiResponse(200, updatedClient, "Client data updated successfully")
    )

});

export {editClient}