import { apiResponse, asyncHandler, Client } from "../allImports.js";

const searchClient = asyncHandler(async (request, response) => {
    const {query} = request?.query;

    const clients = await Client.find({
        $or: [
            {
                material: {$regex: query, $options: "i"}
            },
            {
                t1: {$regex: query, $options: "i"}
            },
            {
                materialDescription: {$regex: query, $options: "i"}
            },
            {
                flameAdhesive: {$regex: query, $options: "i"}
            },
            {
                colorway: {$regex: query, $options: "i"}
            },
            {
                width: {$regex: query, $options: "i"}
            },
        ]
    });

    if(clients.length === 0){
        return response.status(200)
        .json(
            new apiResponse(200, {}, `No client data found for ${query}`)
        )
    }

    return response.status(200)
    .json(
        new apiResponse(200, clients, "Clients fetched successfully")
    )
});

export {searchClient}