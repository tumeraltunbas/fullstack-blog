export const sendJwtToCookie = (user, res) => {

    const {NODE_ENV, COOKIE_EXPIRES} = process.env;

    const token = user.createJwt();

    return res
    .status(200)
    .cookie("token", token, {
        httpOnly: NODE_ENV == "development" ? true : false, 
        secure:false,
        maxAge: COOKIE_EXPIRES
    })
    .json({success:true});
}