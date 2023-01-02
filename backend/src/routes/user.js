import UserModel from '../models/user'

exports.checkUser = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.body
    // console.log(req.body);
    /****************************************/
    // TODO Part III-3-b: create a new comment to a restaurant
    const { name, email } = req.body;

    // console.log('Comment created', newComment);

    const existing = await UserModel.findOne({ name, email });
    if (!existing) {
        const newUser = new UserModel({ name, email });
        await newUser.save();
        // const msg = `Updating (${Name}, ${Subject}, ${Score})`
        // const card = `(${Name}, ${Subject}, ${Score})`
        // return [msg, card];
    }
}