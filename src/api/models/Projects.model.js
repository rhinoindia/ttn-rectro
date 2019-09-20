import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  name: { type: String, required: true, unique: true },
  roles: { type: Array, required: true },
  members: { type: Array, required: true },
  userEmail: { type: String, required: true },
  boards: [{ type: Schema.Types.ObjectId, ref: 'Boards' }],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'Projects',
  emitIndexErrors: true,
});
const Projects = mongoose.model('Projects', ProjectSchema);

export default Projects;
