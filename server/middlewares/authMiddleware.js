// const JWT =  require("jsonwebtoken");
// const userModel = require("../models/userModel");

// const requireSignIn = async (req,res,next) => {
//     try {
//         const decode = JWT.verify(
//             req.headers.authorization,
//             process.env.JWT_SECRET
//         );
//         req.user = decode;
//         next();
//     } catch (error) {
//         console.log(error)

//     }
// }

// const isAdmin = async (req,res, next) => {
//     try {
//         const user = await userModel.findById(req.user._id)
//         if ( user.role !== 1)
//         {
//             return res.status(401).send({
//                 success : false,
//                 message : "unauthorized access"
//             }) 
//         } else {
//             next()
//         }
//     } catch (error) {
//         res.status(401).send({
//             success:false,
//             message:"error in admin middleware"
//         })
//     }
// }

// module.exports = {requireSignIn , isAdmin}

const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized: Missing or invalid token" });
        }

        const tokenData = token.replace("Bearer ", "");

        // Verify the token
        const decoded = JWT.verify(tokenData, process.env.JWT_SECRET);
        
        // Set user data in the request
        req.user = decoded;
        
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

module.exports = { requireSignIn };



module.exports = {requireSignIn }