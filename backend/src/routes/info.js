import ExperimentModel from '../models/experiment'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    // console.log(sortBy);
    const priceFilter = req.query.priceFilter
    const mealFilter = req.query.mealFilter
    const typeFilter = req.query.typeFilter
    /****************************************/

    // NOTE Hint:
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success,
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })`
    // const checkData = await Info.find();
    // console.log(checkData);
    // TODO Part I-3-a: find the information to all restaurants
    if (!priceFilter && !mealFilter && !typeFilter) {
        const allSearch = await ExperimentModel.find({});
        // console.log(allSearch);
        res.status(200).send({ message: 'success', contents: allSearch, });
        // console.log('backend_info',allSearch)
    }


}

exports.GetInfo = async (req, res) => {
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