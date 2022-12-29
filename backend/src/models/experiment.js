import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ExpSchema = new Schema({
    title: { type: String, required: [true, 'Title field is required.'] },
    location: { type: String, required: [true, 'Location field is required.'] },
    experimenter: { type: String, required: [true, 'experimenter field is required.'] },
    length: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    time: { type: String, required: true },
    introduction: { type: String, required: [true, 'Introduction field is required.'] },
    memo: { type: String, required: true },
    reward: { type: String, required: [true, 'User Name field is required.'] },
    link: { type: String, required: true },
    types: [{ type: String, required: true },],
    tags: [{ type: String, required: true },],
    locationTag: [{ type: String, required: true },],
    otherTags: [String],
    comments: [{ user: { type: mongoose.Types.ObjectId, ref: 'User' }, comment: { type: String } }],
}, {
    collection: 'Experiment',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const ExperimentModel = mongoose.model('Experiment', ExpSchema);

export default ExperimentModel;