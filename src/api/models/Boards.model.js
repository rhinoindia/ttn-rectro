import mongoose from 'mongoose';

const { Schema } = mongoose;

const BoardSchema = new Schema({
  name: { type: String, required: true, unique: true },
  columns: [{
    name: { type: String, required: true },
  }],
  comments: [{
    columnId: { type: Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    upvote: { type: Number },
  }],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'Boards',
  emitIndexErrors: true,
});
const Boards = mongoose.model('Boards', BoardSchema);
Boards.createIndexes();

export default Boards;
