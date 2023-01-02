import ExperimentModel from '../models/experiment'
import UserModel from '../models/user'
import { uuid } from "uuidv4";

const validateUser = async (name, email) => {
    // console.log("Finding user..." + name);
    const existing = await UserModel.findOne({ name, email });
    // console.log(existing);
    if (existing) return existing;
    const user = new UserModel({ name, email }).save();
    return user;

}

exports.createInfo = async (req, res) => {
    const info = req.body;

    const name = info.c.name;
    const email = info.c.email;

    const final = info.values
    final.id = uuid();
    // console.log('info', info);

    const check_user = await validateUser(name, email);
    final.creator = check_user;

    const newExperiment = new ExperimentModel(final);
    // console.log('hi',message);
    try { newExperiment.save(); } catch (e) { throw new Error("Message DB save error: " + e); }
    // const newExperiment = new ExperimentModel(info);
    // await newExperiment.save()
    // console.log("new experiment created", newExperiment)
    res.json({ message: "success" });
}