import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    content: { type: String },
    reply: [{ user: { type: mongoose.Types.ObjectId, ref: 'User' }, content: { type: String } }]
}, {
    collection: 'Comment',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const CommentModel = mongoose.model('Comment', CommentSchema)

export default CommentModel;