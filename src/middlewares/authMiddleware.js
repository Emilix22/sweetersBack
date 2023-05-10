function authMiddleware (req, res, next){
    if(!req.session.userLogged){
        
       return res.send('debe estar logueado para continuar');
        
    }
        next();
};

module.exports = authMiddleware;