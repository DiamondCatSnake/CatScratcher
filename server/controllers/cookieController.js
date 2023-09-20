const cookieController = {};

cookieController.setSSID = (req, res, next) => {
  // res.cookie('ssid', '12345567899');
  if (res.locals.newUser) {
    console.log(JSON.stringify(res.locals));
    console.log('res.locals.newUser._id',res.locals.newUser._id);
    res.cookie('ssid', res.locals.newUser._id);
  } else {
    console.log('No existing user');
  }
  return next();
};

module.exports = cookieController;

// {
//   httpOnly: false,
//   path: '/',
//   secure: false,
//   sameSite: 'None',
//   expires: new Date(Date.now() + 3600000)
// }