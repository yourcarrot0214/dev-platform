import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const saltRounds = 10;
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 10,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 8,
  },
  profileImage: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.encryption = function (newPassword, cb) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return cb(err);

    bcrypt.hash(newPassword, salt, function (err, hash) {
      if (err) return cb(err);
      newPassword = hash;
      cb(null, newPassword);
    });
  });
};

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// userSchema.methods.generateToken = function (cb) {
//   var user = this;
//   const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET!);
//   user.token = token;
//   user.save((err, user) => {
//     if (err) return cb(err);
//     cb(null, user);
//   });
// };

// userSchema.statics.findByToken = function (token, cb) {
//   var user = this;

//   jwt.verify(token, "secretToken", function (err, decoded) {
//     if (err) return console.log(err);
//     user.findOne({ _id: decoded, token: token }, function (err, user) {
//       if (err) return cb(err);
//       cb(null, user);
//     });
//   });
// };

export default userSchema;
