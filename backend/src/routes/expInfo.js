import ExperimentModel from '../models/experiment'

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