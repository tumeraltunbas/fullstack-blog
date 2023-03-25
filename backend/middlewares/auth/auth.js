import jwt from "jsonwebtoken";


export const getAccessToRoute = (req, res, next) => {
    
    const {token} = req.cookies;
    const {JWT_SECRET_KEY} = process.env;
    
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            return next(err);
        }

        req.user = decoded;
        next()
    })
}
