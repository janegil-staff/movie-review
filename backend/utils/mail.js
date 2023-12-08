
exports.generateOTP = (otp_length = 6) => {
  let OTP = "";
  for (let i = 0; i <= otp-length; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  const newEmailVertificationToken = new EmailVertificationToken({
    owner: newUser._id,
    token: OTP,
  });
  return OTP;
}

exports.generateMailTransport = () => {
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a7dcd2076ddc8c",
      pass: "02ad9e8eb7bd5e",
    },
  });


}