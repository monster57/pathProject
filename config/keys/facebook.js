module.exports = {

   'facebookAuth' : {
       'clientID'      : '1341428759207050', // your App ID
       'clientSecret'  : 'ee698f5b0732b8d0289ea52d36c70bdc', // your App Secret
       'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
       'profileFields' : ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'gender']
   }
};