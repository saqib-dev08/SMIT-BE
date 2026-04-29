import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { successResponse } from "../responseHandlers/successResponse.js";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  try {
    const { userName, email, password, age } = req.body;

    console.log(req.body);

    bcrypt.hash(password, 12, async function (err, hash) {
      console.log("password hash ==>", hash);

      const signedUser = await User.create({
        ...req.body,
        password: hash,
      });

      successResponse(res, 200, true, "User signed up successfully!", signedUser);
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password)
      throw new Error("All fields are required!");

    const loggedUser = await User.findOne({ email: email });

    bcrypt.compare(password, loggedUser.password, function (err, result) {
        try{
       
            if (result) {
              const token = jwt.sign(
                { email: loggedUser.email, id: loggedUser._id },
                process.env.JWT_SECRET_KEY,
                {expiresIn : 1*60*60}
              );
              successResponse(res, 200, true, "User logged in successfully!", loggedUser, token);
            } else {
              throw new Error("Invalid credentials!")
            }
        } catch(err) {
            next(err);  
        }
          });
            
  } catch (error) {
    next(error);
  }
};

export { signup, login };
