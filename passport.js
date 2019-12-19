const passport = require('passport');
const passportJWT = require("passport-jwt");
const UserModel = require('./db')('mydb-1').db.get('users');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {

        //Assume there is a DB module pproviding a global UserModel
        return UserModel.findOne({ email, password })
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'Incorrect email or password.' });
                }

                return cb(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'aJskDlf3s3ff5ds'
},
    function (jwtPayload, cb) {

        //find the user in db if needed
        return UserModel.findOne({ '_id': jwtPayload._id })
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));