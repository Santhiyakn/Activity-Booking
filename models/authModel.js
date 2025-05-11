import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
const { isMobilePhone ,isEmail}=validator;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required']
    },
    email:{
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        validate: [isEmail, 'Please provide a valid email address.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function (v) {
                return isMobilePhone(v, null, { strictMode: false });
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  if (user.password.length < 8 || user.password.length > 15) {
    return next(new Error('Password must be between 8 and 15 characters.'));
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;
