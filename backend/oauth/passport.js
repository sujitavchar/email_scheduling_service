import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';
import { createUser, findUserByEmail } from "../utils/utils.userservice.js";


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {

      try {
        const name = profile.displayName;
        const email = profile.emails[0].value;

        let user = await findUserByEmail(email);

        if (!user) {
          await createUser(name, email);
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }

    }
  )
);
