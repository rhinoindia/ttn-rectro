import mongoose from 'mongoose';

const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'Users',
  emitIndexErrors: true,
});
const UserModel = mongoose.model('Users', UsersSchema);

export default UserModel;
