import { apiResponse, asyncHandler, Client, User } from "../allImports.js";

const deleteClient = asyncHandler(async (request, response) => {
    const {clientId} = request?.params;

    if(!clientId){
        throw new apiError(404, "Client id not found")
    }

    const foundClient = await Client.findById(clientId);

    if(!foundClient){
        throw new apiError(404, "Client data not found or maybe deleted")
    }

    await Client.findByIdAndDelete(clientId);

    await User.findOneAndUpdate(
        {
            _id: request.user?.id
        },

        {
            $pull: {
                clientData: clientId
            }
        },

        {new: true}
    );

    return response.status(200)
    .json(
        new apiResponse(200, {}, "Client deleted successfully")
    )

});

export { deleteClient }