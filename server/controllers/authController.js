
const userSchema = require("../models/userModel");
const {hashPassword, comparedPassword} = require("../helpers/authHelper")
const JWT = require("jsonwebtoken")
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address , answer } = req.body;

    // Validations
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }
    if (!answer) {
      return res.status(400).json({ message: "Answer is required" });
    }

    // Check existing user
    
    const existingUser = await userSchema.findOne({ email });
if (existingUser) {
  return res.status(409).json({
    success: false,
    message: "User is already registered",
  });
}

    // Register
    const hashedPassword = await hashPassword(password);

    // Save user
    const user =  await new userSchema({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error in registration",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check user
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not registered',
      });
    }

    const match = await comparedPassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password',
      });
    }

    // Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        answer: user.answer,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Login error',
      error: error.message, 
    });
  }
};

//forgot password
const forgotPasswordController = async (req,res) => {
  try {

    const {email, answer , newPassword} =req.body
    if (!email){
      res.status(400),send({message:'Email is required'})
    }
    if (!answer){
      res.status(400),send({message:'answer is required'})
    }
    if (!newPassword){
      res.status(400),send({message:'New Password is required'})
    }
    //user
    const user = await userSchema.findOne({email, answer});
//validation
if (!user) {
  return res.status(404).send({
    success:false,
    message:'wrong email or answer'
  });
}
const hashed = await hashPassword(newPassword);
await userSchema.findByIdAndUpdate(user._id , {password :hashed})
res.status(200).send({
  success:true,
  message: "Password Reset Successfully"
})

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'something went wrong',
      error
    })
  }
}



module.exports = { registerController , loginController ,forgotPasswordController}
