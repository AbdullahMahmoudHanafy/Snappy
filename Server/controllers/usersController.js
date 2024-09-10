import Users from "../model/userModel.js";
import bcrypt from "bcrypt";

const register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const emailCheck = await User.findOne({email});

        if (email)
            return res.json({msg: "Email is already used", status: false});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            email,
            username, 
            password: hashedPassword,
        })

        delete user.password;

        return res.json({status: true, user});
    } catch (error) {
        next(error);
    }
}



export default register;