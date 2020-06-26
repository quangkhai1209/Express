module.exports.cookiesCount = (req,res,next)=>{
    res.cookie("cookie" , req.cookies.cookie = parseInt(req.cookies.cookie) + 1 || 0);
    next();
}
module.exports.logCount = (req,res,next)=>{
    console.log(req.cookies);
    next();
}