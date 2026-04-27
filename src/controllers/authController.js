import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { successResponse } from "../responseHandlers/successResponse.js";

const signup = async (req, res) => {
  try {
    const { userName, email, password, age } = req.body;

    console.log(req.body);

    bcrypt.hash(password, 12, async function (err, hash) {
      console.log("password hash ==>", hash);

      const signedUser = await User.create({
        ...req.body,
        password: hash,
      });

     successResponse(res, 200, true, "User signed up successfully!", signedUser)

    });

  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const findUser = await User.findOne({ email: email });

    console.log("finddedUser ==>", findUser);

    bcrypt.compare(password, findUser.password, function(err,result){
        if(result){
            res.status(200).json({
                status : true,
                message : "User logged in successfully!"
            })
        }
    })  

  } catch (error) {
    res.status(404).json({
      status: true,
      message: error.mmessage,
    });
  }
};

export { signup, login };
