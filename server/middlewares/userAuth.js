import jwt from 'jsonwebtoken';


const userAuth = (req, res, next) => {
  const { token } = req.cookies;
  if(!token){
    return res.status(401).json({ success: false, message: "Unauthorized. Please login first" });
  }
  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecoded.id) {
      req.userId = tokenDecoded.id;

    } else {
      return res.json({ success: false, message: "Unauthorized. Please login first" });
    }
    next();
    
  } catch (error) {
    return res.json({ success: false, message: error.message });
    
  }
}



export default userAuth;  