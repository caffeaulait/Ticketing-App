import mongoose from 'mongoose';
import { Password } from '../services/password';

//properties of a new user
interface UserAttrs {
  email: string;
  password: string;
}

//properties of a user document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

//properties of a user model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//'this' referes to the doc being saved. do not use arrow function here
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };