import ExperimentModel from '../models/experiment'
import UserModel from '../models/user'

const validateUser = async (name, email) => {
    // console.log("Finding user..." + name);
    const existing = await UserModel.findOne({ name, email });
    // console.log(existing);
    if (existing) return existing;
    const user = new UserModel({ name, email }).save();
    return user;

}

exports.getInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    // console.log(id);
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
    const allSearch = await ExperimentModel.find({ id })
    res.status(200).send({ message: 'success', contents: allSearch, })
}

exports.getMyexp = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const body = req.query
    const name = body.name
    const email = body.email
    // console.log(id);
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests

    const check_user = await validateUser(name, email);
    const allSearch = await ExperimentModel.find({ creator: check_user })
    res.status(200).send({ message: 'success', contents: allSearch, })
}