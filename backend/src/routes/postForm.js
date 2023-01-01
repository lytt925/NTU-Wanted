import ExperimentModel from '../models/experiment'
import {uuid} from "uuidv4";

exports.createInfo = async (req, res) => {
    const info = req.body;
    info.id = uuid();
    console.log(info)
    const newExperiment = new ExperimentModel(info);
    await newExperiment.save()
    console.log("new experiment created", newExperiment)
    res.json({ message: "success" });
}