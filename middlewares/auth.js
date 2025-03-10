import awt from 'jsonwebtoken';


function auth(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: "You are not authenticated"});
    }

    try{
        const decoded = awt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        return next();

    }
    catch(error){
        console.error("Error verifying token:", error);
        return res.status(401).json({message: "You are not authenticated"});
    }
}

export default auth;