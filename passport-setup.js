const passport = require('passport');
const OAuthUser = require('./models/oauthusermodel.cjs');
const GoogleStrategy = require('passport-google-oauth20');
const expresssession = require('express-session');

passport.use(
  new GoogleStrategy(
    {
      clientID: '520881014047-cubkng9ru414c81pmfslprqrj3ap2e4d.apps.googleusercontent.com', // Replace with your actual client ID
      clientSecret: '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', // Replace with your actual client secret
      callbackURL: 'http://localhost:3000/auth/google/callback',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id;
      const displayName = profile.displayName;
      const givenName = profile.name.givenName;
      const familyName = profile.name.familyName;
      const photoUrl = profile.photos[0].value;

      try {
        // Check if the user exists in the OAuthUser model
        let existingOAuthUser = await OAuthUser.findOne({ googleId }).exec();

        if (existingOAuthUser) {
          // Update the existing OAuth user's profile
          existingOAuthUser.displayName = displayName;
          existingOAuthUser.givenName = givenName;
          existingOAuthUser.familyName = familyName;
          existingOAuthUser.photoUrl = photoUrl;

          await existingOAuthUser.save();
          return done(null, existingOAuthUser);
        } else {
          // Check if the user exists in the User model (for email/password-based users)
          let existingUser = await User.findOne({ googleId }).exec();

          if (existingUser) {
            // Update the existing user's profile
            existingUser.displayName = displayName;
            existingUser.givenName = givenName;
            existingUser.familyName = familyName;
            existingUser.photoUrl = photoUrl;

            await existingUser.save();
            return done(null, existingUser);
          } else {
            // Create a new OAuth user profile
            const newOAuthUser = new OAuthUser({
              googleId,
              displayName,
              givenName,
              familyName,
              photoUrl,
            });

            await newOAuthUser.save();
            return done(null, newOAuthUser);
          }
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await OAuthUser.findById(id).exec();
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  