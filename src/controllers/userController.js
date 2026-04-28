import { User } from "../models/userSchema.js";
import { successResponse } from "../responseHandlers/successResponse.js";


const getUser = async (req, res, next) => {
try {
    
    const {limit, skip, sort} = req.query;
console.log(req.query);

    const filteredUser = await User.limit(limit).skip(skip).sort(sort);

    console.log("filteredUser ==>", filteredUser);

    successResponse(res, 200, true, filteredUser)

} catch (error) {
    next(error)
}

}

export default getUser;