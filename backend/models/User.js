// User Schema define kiya for DB : 
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { 
      type: String,
      required: true,
      trim: true,
    },
    lastName: { 
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    otp: {
     type: String 
    },
    otpExpires: { 
      type: Date 
    }, 
    isVerified: { 
      type: Boolean, default: false 
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;