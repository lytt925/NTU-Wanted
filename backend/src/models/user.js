import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: [true, 'User Name field is required.'] },
    email: { type: String, required: [true, 'email field is required.'] },
    likedResearch: [{ type: mongoose.Types.ObjectId, ref: 'Experiment' }]
}, {
    collection: 'User',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel;