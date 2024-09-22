import Users from "../model/userModel.js";
import bcrypt from "bcrypt";

const register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const emailCheck = await Users.findOne({email});

        if (emailCheck)
        {
            return res.json({msg: "Email is already used", status: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            email,
            username, 
            password: hashedPassword,
        })

        delete user.password;

        console.log(user);

        return res.json({status: true, user});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await Users.findOne({email});

        if (!user)
            return res.json({msg: "This email doesn't exist", status: false});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({msg: "Incorrect Password", status: false});
        delete user.password;

        console.log(user);

        return res.json({status: true, user});
    } catch (error) {
        next(error);
    }
}


const setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatar = req.body.image;
        const userData = await Users.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage:avatar,
        })
        return res.json({isSet: userData.isAvatarImageSet, image: userData.avatarImage})
    } catch (error) {
        next(error);
    }
}


export {register, login, setAvatar};