import mongoose from "mongoose";
import { apiResponse, asyncHandler, Client } from "../allImports.js";

const viewTotalClient = asyncHandler(async (request, response) => {

    const userId = request.user?.id;

    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 20;
    const skip = (page - 1) * limit;

    const totalClients = await Client.aggregate([
        {
            $match: {
                creator: new mongoose.Types.ObjectId(userId)
            }
        },

        {
            $facet: {
                totalCount: [
                    {$count: "count"}
                ],

                clientData: [
                    { $sort: { createdAt: -1 } },
                    { $skip: skip },
                    { $limit: limit },
                    { $project: { __v: 0, creator: 0 } }
                ]
            }
        }
    ]);

    const count = totalClients[0]?.totalCount[0]?.count || 0;

    return response.status(200).json(
        new apiResponse(200, {
            totalCount: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            clients: totalClients[0].clientData
        }, "Clients data fetched successfully")
    );
});

export { viewTotalClient }