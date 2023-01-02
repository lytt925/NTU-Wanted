import ExperimentModel from '../models/experiment';
import UserModel from '../models/user'

exports.checkUser = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    // console.log(req.body);
    /****************************************/
    // TODO Part III-3-b: create a new comment to a restaurant
    const { name, email } = req.body;

    const existing = await UserModel.findOne({ name, email });
    if (!existing) {
        const newUser = new UserModel({ name, email });
        await newUser.save();
    }
}

exports.getLikedList = async (req, res) => {
    const { email } = req.query
    console.log('body', req.query)
    if (email) {
        const user = await UserModel.findOne({ email });
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
            console.log('like')
            user.likedList.push(exp)
        }
        else if (user && exp && action === 'unlike') {
            console.log('exp', exp._id)
            const remove = await UserModel.updateOne(
                {
                    _id: user._id
                },
                {
                    $pull: { 'likedList': exp._id }
                },
                {
                    upsert: true
                }
            );
        }
        try {
            await user.save()
            const updatedUser = await UserModel.findOne({ _id: user._id })
            res.json({ message: "success", likedList: updatedUser.likedList });
        } catch (e) {
            res.json({ message: 'error' })
            console.error(e)
        }
    }
}