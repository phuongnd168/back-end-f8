var GitHubStrategy = require('passport-github2').Strategy;
const model = require("../models/index");
const Provider = model.Provider
const User = model.User
module.exports = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    scope: ['user:email'],
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    
  },
  async function(accessToken, refreshToken, profile, done) {
    const {username, emails} = profile
    const [{ value: email }] = emails;
    
    const provider = "github";
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
        name: username,
        email,
        provider_id: providerId,
      });
    }
   
    return done(null, user);
   
    
      
    
    
  }
);