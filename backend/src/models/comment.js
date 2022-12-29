import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: { type: String, required: [true, 'User Name field is required.'] },
    content: { type: String, required: [true, 'content field is required.'] },
    reply: [{ name: { type: mongoose.Types.ObjectId, ref: 'User' }, commet: { type: String } }]
}, {
    collection: 'Comment',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const CommentModel = mongoose.model('Comment', CommentSchema)

export default CommentModel;