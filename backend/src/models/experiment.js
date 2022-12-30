import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ExpSchema = new Schema({
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
    id: { type: String, required: [true, 'id field is required.'] },
    title: { type: String, required: [true, 'Title field is required.'] },
    location: { type: String, required: [true, 'Location field is required.'] },
    experimenter: { type: String, required: [true, 'experimenter field is required.'] },
    length: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    time: { type: String, required: true },
    timeRange: { from: { type: String, required: true }, to: { type: String, required: true } },
    introduction: { type: String, required: [true, 'Introduction field is required.'] },
    memo: { type: String, required: true },
    reward: { type: String, required: true },
    link: { type: String },
    typeTags: [{ type: String, required: true },],
    rewardTags: [{ type: String, required: true },],
    locationTags: [{ type: String, required: true },],
    otherTags: [{ type: String }],
    // comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    comments: [{
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        content: { type: String },
        reply: [{ user: { type: mongoose.Types.ObjectId, ref: 'User' }, content: { type: String } }]
    }]
}, {
    collection: 'Experiment',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const ExperimentModel = mongoose.model('Experiment', ExpSchema);
export default ExperimentModel;