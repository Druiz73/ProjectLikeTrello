import User from "../models/user";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import error_types from "./error_types";
import crypto, { Hash } from "crypto";
import moment from "moment";
import emailTemplate from "../emailTemplates/emailTemplates";
import emailService from "../service/email-service";

let tokenExpires = [];

const controller = {
  register: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        throw new error_types.InfoError("user already exists");//
      } else {
        if (req.body.password.length > 30 || req.body.email.length > 30) {
          throw new error_types.InfoError("the maximum input is 30 characters");
        } else {
          if (req.body.password.length < 8) {
            throw new error_types.InfoError("the password must be at least 8 characters");
          } else {
            var hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
            let newUser = new User();
            newUser.email = req.body.email || "";
            newUser.password = hash;
            newUser.save();
            emailService.sendMail(emailTemplate.userRegister(), req.body.email);
            res.json({ message: "User registered and Email successfully sent" });//
          }
        }
      }
    } catch (err) {
      next(err);
    }
  },
  login: (req, res, next) => {
    passport.authenticate("local", { session: false }, (error, user) => {
      //if there was an error in the callback verify related to the user data query
      if (error || !user) {
        next(new error_types.Error404("email or password not correct."));
      } else {
        const payload = {
          sub: user._id,
          exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
          email: user.email,
        };

        /*We only indicate the payload since the header is already created by the lib jsonwebtoken internally
            for the calculation of the signature and thus obtain the token*/
        const token = jwt.sign(
          JSON.stringify(payload),
          process.env.JWT_SECRET,
          { algorithm: process.env.JWT_ALGORITHM }
        );
        res.json({ data: { token: "Bearer " + token } });
      }
    })(req, res);
  },
  loginGoogle: (req, res, next) => {
    passport.authenticate("google", { session: false }, (error, user) => {
      //if there was an error in the callback verify related to the user data query
      if (error || !user) {
        next(new error_types.Error404("email or password not correct."));
      } else {
        const payload = {
          sub: user._id,
          exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
          email: user.email,
        };
        const token = jwt.sign(
          JSON.stringify(payload),
          process.env.JWT_SECRET,
          { algorithm: process.env.JWT_ALGORITHM }
        );
        res.redirect(process.env.SERVER_FE + "/success-login/?token=" + token);
      }
    })(req, res);
  },
  recovery: async (req, res, next) => {
    try {
      let query = await User.findOne({ email: req.body.email });
      if (query) {
        //genero token
        await crypto.randomBytes(20, function (err, buffer) {
          var token = buffer.toString("hex");
          //actualizo usuario guardando el token y su expiracion
          User.findOneAndUpdate({ _id: query._id }, {
            reset_password_token: token, reset_password_expires: moment().add(1, "days"),//
          }, { upsert: true, new: true }).exec(function (err, user_updated) {
            // send email
            const response = emailService.sendMail(emailTemplate.recoveryPassword(token), user_updated.email);
            response.then(
              result => {
                res.json({ message: "Email successfully sent" });
              }
            );
            response.catch(err => done(err, null));
          });
        });
      } else {
        res.json({ message: "Email successfully sent" });
      }
    } catch (err) {
      res.json({ message: "Email successfully sent" });
    }
  },
  updatePassword: async (req, res, next) => {
    if (req.body.password == "") {
      return res.status(401).send({ message: "Password required" });
    }
    try {
      let user = await User.findOne({ reset_password_token: req.params.token });
      user.reset_password_token = "";
      let hash = await bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
      user.password = hash;
      user.save();
      res.status(200).send({ message: "Password updated" });
    } catch (err) {
      throw new error_types.Error504("Error to server");
    }
  },
  confirmToken: async (req, res, next) => {
    try {
      let user = await User.findOne({ reset_password_token: req.params.token });
      if (user === null) {
        res.status(401).send({ message: "token expired" });
      } else {
        console.log("user", user)
        let expires = moment(user.reset_password_expires);
        let today = moment();
        if (user && (expires > today)) {
          res.status(200).send({ message: "token ok" });
        } else {
          res.status(401).send({ message: "token expired" });
        }
      }
    } catch (err) {
      throw new error_types.Error504("Error to server");
    }
  }
};

export default controller;
