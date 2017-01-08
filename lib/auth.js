var AuthFunctions = {};

AuthFunctions.isLoggedIn = function( req, res ) {
  if ( req.user )
    return res.apiSuccess( {loggedIn: true} );
  else
    return res.apiSuccess( {loggedIn: false });
};

AuthFunctions.loginError = function( req, res ) {
  res.apiError({message:"Login Error! try again later"});
};


module.exports = AuthFunctions;