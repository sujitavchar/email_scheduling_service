import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = {
        name: profile.displayName,
        email: profile.emails[0].value
      };

      // TODO: save/find user in DB
      return done(null, user);
    }
  )
);
