import { apiResponse, asyncHandler, Client } from "../allImports.js";

const viewAllClients = asyncHandler(async (request, response) => {
    
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit);
    const skip = (page - 1) * limit;

    const totalClients = await Client.countDocuments();
    
    const allClients = await Client.find().skip(skip).limit(limit);

    return response.status(200)
    .json(
        new apiResponse(200, {
            clients: allClients,
            total: totalClients,
            currentPage: page,
            totalPages: Math.ceil(totalClients / limit)
        }, "All clients fetched successfully")
    )
});

export { viewAllClients }