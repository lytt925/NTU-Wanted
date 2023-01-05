import ExperimentModel from '../models/experiment';
import UserModel from '../models/user'

exports.checkUser = async (req, res) => {
    const { name, email } = req.body;

    const existing = await UserModel.findOne({ name, email });
    if (!existing) {
        const newUser = new UserModel({ name, email });
        await newUser.save();
    }
}

exports.getLikedList = async (req, res) => {
    const { email } = req.query
    if (email) {
        const user = await UserModel.findOne({ email }).populate(['likedList']);
        try {
            res.json({ message: "success", likedList: user.likedList });
        } catch (e) {
            res.json({ message: "error" });
        }
    }
}

exports.updateLikeList = async (req, res) => {
    const { email, expId, action } = req.body
    if (email) {
        const user = await UserModel.findOne({ email })
        const exp = await ExperimentModel.findOne({ _id: expId })
        if (user && exp && action === 'like') {
            if (!user.likedList.includes(exp._id))
                user.likedList.push(exp)
        }
        else if (user && exp && action === 'unlike') {
            await UserModel.updateOne(
                { _id: user._id },
                { $pull: { 'likedList': exp._id } },
            );
        }
        try {
            await user.save()
            const updatedUser = await UserModel.findOne({ _id: user._id }).populate(['likedList'])
            res.json({ message: "success", likedList: updatedUser.likedList });
        } catch (e) {
            res.json({ message: 'error' })
            console.error(e)
        }
    }
}