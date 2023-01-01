import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ExpSchema = new Schema({

    //基本資料
    creator: { type: mongoose.Types.ObjectId, ref: 'User' },
    id: { type: String, required: [true, 'id field is required.'] },
    title: { type: String, required: [true, 'Title field is required.'] },
    location: { type: String, required: [true, 'Location field is required.'] },
    experimenter: { type: String, required: [true, 'experimenter field is required.'] },
    phone: { type: String },
    email: { type: String, required: true },

    //受試者條件
    age: { upper: { type:Number }, lower: { type:Number } },
    requirements: { type: String },

    //研究內容
    length: { type: String, required: true },
    time: { type: String, required: true },
    timeRange: { from: { type: String, required: true }, to: { type: String, required: true } },
    introduction: { type: String, required: [true, 'Introduction field is required.'] },
    memo: { type: String },
    reward: { type: String },
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