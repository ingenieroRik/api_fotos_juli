const adminMiddleware = (req, res, next) => {
    if (req.session && req.session.admin === process.env.ADMIN) {
        //console.log(req.session.isAdmin);
        return next();
    } else {
        return res.send ("No tienes los privilegios para ingresar");
       
    }
};

module.exports = adminMiddleware;
