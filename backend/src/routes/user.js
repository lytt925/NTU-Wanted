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
            res.json({ message: "success", likedList: user.likedResearch });
        } catch (e) {
            res.json({ message: "error" });
        }
    }
}

exports.updateLikeList = async (req, res) => {
    const { userEmail, expId } = req.body
    if (userEmail) {
        const user = await UserModel.findOne({ email: userEmail });
        const likeExp = await ExperimentModel.findOne({ _id: expId })
        if (user && likeExp)
            user.likedResearch.push(likeExp)
        try {
            await user.save()
            res.json({ message: "success" });
        } catch (e) {
            res.json({ message: 'error' })
            console.error(e)
        }
    }
}