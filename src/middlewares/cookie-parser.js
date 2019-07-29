export default function cookieParser(err, req, res, next) {
  if (err) {
    next(err);
  }
  req.parsedCookies = req.headers.cookies;
  next();
}
