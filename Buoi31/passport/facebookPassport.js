const FacebookStrategy = require('passport-facebook');
const model = require("../models/index");
const Provider = model.Provider
const User = model.User
module.exports = new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      state: true,
      profileFields: ['id', 'emails', 'name']
    },
    async (accessToken, refreshToken, profile, done) => {
    
  
      const { name, emails } = profile;
      const {givenName, familyName} = name
      const [{ value: email }] = emails;
      const fullName = givenName + " " + familyName
    

      const provider = "facebook";
      let providerDetail = await Provider.findOne({
        where: {
          name: provider,
        },
      });
  
   
      let providerId;
      if (!providerDetail) {
        providerDetail = await Provider.create({
          name: provider,
        });
      }

     
      providerId = providerDetail.dataValues.id;
      let user = await User.findOne({
        where: {
          email,
          provider_id: providerId,
        },
      });
   
      if (!user) {
        user = await User.create({
          name: fullName,
          email,
          provider_id: providerId,
        });
      }
     
      return done(null, user);
    },
  );