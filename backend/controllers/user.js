const nodemailer = require("nodemailer");
const User = require("../models/user");
const EmailVertificationToken = require("../models/emailVertificationToken");
const { isValidObjectId } = require("mongoose");
const { use } = require("../routes/user");
const { generateOTP, generateMailTransport } = require("../utils/mail");
const { sendError } = require("../utils/helper");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser)
    return sendError(res, 'This email is already in use');

  const newUser = new User({ name, email, password });
  await newUser.save();

  let OTP = generateOTP(6);

  await newEmailVertificationToken.save();

  var transport = generateMailTransport();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: newUser.email,
    subject: "Email verification",
    html: `
    <p>Your verification token</p>
    <h1>${OTP}</h1>
    `,
  });

  res
    .status(201)
    .json({
      user: "Please verify you email. OTP has been sendt to you account",
    });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return sendError(res, 'TInvalid user');

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'User not found', 404);

  if (user.isVerified) return res.json({ error: "User is already verified" });

  const token = EmailVertificationToken.findOne({ owner: userId });
  if (!token) return sendError(res, 'TToken not found');

  //const isMatched = await token.compareToken(OTP);
  //if(!isMatched) return res.json({error: 'Please provide valid ODP'});

  user.isVerified = true;
  await user.save();

  await EmailVertificationToken.findByIdAndDelete(token._id);

  var transport = generateMailTransport();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Welcome",
    html: `<h1>Welcome to our app and thanks for choosing us.</h1>
    `,
  });
  res.json({ message: "You email is verified" });
};
exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user)return sendError(res, 'USer not found');

  if (user.isVerified)
  return sendError(res, 'This email is already verified');

  const alreadHaveToken = await EmailVertificationToken.findOne({
    owner: userId,
  });
  if (alreadHaveToken)
    res.json({
      error: "Only after one hour you can request for another token",
    });

    let OTP = generateOTP(6);
  
    await newEmailVertificationToken.save();

    var transport = generateMailTransport();
  
    transport.sendMail({
      from: "verification@reviewapp.com",
      to: user.email,
      subject: "Welcome",
      html: `<h1>Welcome to our app and thanks for choosing us.</h1>
      `,
    });
};
