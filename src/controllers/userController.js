import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { successResponse } from "../responseHandlers/successResponse.js";
import dotenv from "dotenv";

dotenv.config();

const getUser = async (req, res, next) => {
  try {
    const { limit, skip, sort } = req.query;
    console.log(req.query);

    const filteredUser = await User.find().limit(limit).skip(skip).sort(sort);

    console.log("filteredUser ==>", filteredUser);

    successResponse(
      res,
      200,
      true,
      "Data retrieved successfully!",
      filteredUser,
    );
  } catch (error) {
    next(error);
  }
};

const userUpdate = async (req, res, next) => {
  try {
    const userUpdateDetails = req.body;

    console.log("userUpdate ==>", userUpdateDetails);

    const userToken = req.headers.authorization.split(" ")[1];
    console.log("userToken ==>", userToken);

    const decodeToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    console.log("decodeToken ==>", decodeToken);

    const updatedUser = await User.findByIdAndUpdate(
      decodeToken.id,
      userUpdateDetails,
    );
    console.log("updatedUser ==>", updatedUser);

    successResponse(res, 200, true, "user updated successfully!", updatedUser);
  } catch (error) {
    next(error);
  }
};

export { getUser, userUpdate };
