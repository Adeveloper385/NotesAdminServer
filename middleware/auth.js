const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
  //    read headers's token
  token = req.header('x-auth-token')

  //    check token
  if(!token){
    res.status(401).json({msg: 'No tienes acceso'})
  }

  //    token validation
  try {
    const access = jwt.verify(token, process.env.SECRETWORD) 
    req.user = access.user
    next()
  } catch(err) {
    res.status(401).json({msg: "Token inválido"})
  }
}
