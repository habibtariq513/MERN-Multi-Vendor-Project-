const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const userData = user.toObject();
  delete userData.password;

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "PRODUCTION",
    })
    .json({
      success: true,
      user: userData,
      token,
    });
};

module.exports = sendToken;
