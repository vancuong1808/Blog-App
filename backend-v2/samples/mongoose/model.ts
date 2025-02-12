import mongoose from 'mongoose';
import loadedAt from './plugins/loadedAt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
});

userSchema.pre('validate', function (next, opts) {
  console.log('Pre validate');
  console.log('Opts', opts);
  console.log('This', this);
  next();
})

userSchema.plugin(loadedAt);

const User = mongoose.model('User', userSchema);

export default User;
