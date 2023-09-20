const cookieController = {};

cookieController.setSSID = (req, res, next) => {
  if (res.locals.newUser) {
    console.log(JSON.stringify(res.locals));
    console.log(res.locals.newUser._id);
    console.log(res.locals.newUser.id);
    res.cookie('SSID', res.locals.newUser._id, {
      httpOnly: true,
      maxAge: 7200000 // 2 hours
    });  }
  return next();
};

module.exports = cookieController;