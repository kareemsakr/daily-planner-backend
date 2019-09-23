const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }
  const self = this;
  // generate a salt
  return bcrypt.genSalt(10, function(error, salt) {
    if (error) {
      return next(error);
    }
    console.log(this);
    // hash the password using the new salt
    return bcrypt.hash(self.password, salt, function(error, hash) {
      if (error) {
        return next(error);
      }
      // override the cleartext password with the hashed one
      self.password = hash;
      console.log(this);

      return next();
    });
  });
});

userSchema.methods.comparePassword = async function(passw) {
  return await bcrypt.compare(passw, this.password);
};

mongoose.model("User", userSchema);
