import { apiError, apiResponse, asyncHandler, Client } from "../allImports.js";

const viewClient = asyncHandler(async (request, response) => {
    const {clientId} = request.params;

    if(!clientId){
        throw new apiError(404, "Client id not found")
    }

    const foundClient = await Client.findById(clientId);

    if(!foundClient){
        throw new apiError(404, "Client data not found")
    }

    return response.status(200)
    .json(
        new apiResponse(200, foundClient, "Client data fetched successfully")
    )
});

export { viewClient }