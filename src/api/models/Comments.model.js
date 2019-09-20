import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
  columnId: { type: Schema.Types.ObjectId },
  message: { type: String },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'Comments',
  emitIndexErrors: true,
});
const Comments = mongoose.model('Comments', CommentSchema);

export default Comments;
