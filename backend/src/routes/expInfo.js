import ExperimentModel from '../models/experiment'
import UserModel from '../models/user'

const validateUser = async (name, email) => {
    const existing = await UserModel.findOne({ name, email });
    if (existing) return existing;
    const user = new UserModel({ name, email }).save();
    return user;

}

exports.getInfo = async (req, res) => {
    const id = req.query.id
    const allSearch = await ExperimentModel.find({ id })
    res.status(200).send({ message: 'success', contents: allSearch, })
}

exports.getMyexp = async (req, res) => {
    const body = req.query
    const name = body.name
    const email = body.email
    const check_user = await validateUser(name, email);
    const allSearch = await ExperimentModel.find({ creator: check_user })
    res.status(200).send({ message: 'success', contents: allSearch, })
}