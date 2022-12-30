import ExperimentModel from '../models/experiment'

const searchExp =
    async (searchName, locationTagsSelected, timeRange, rewardTagsSelected, typeTagsSelected) => {
        try {
            const findList = await ExperimentModel.find({});
            console.log('findList', findList)
            return findList
        } catch (e) {
            throw new Error('something wrong')
        }
    }

exports.getExpList = async (req, res) => {
    const {
        searchName,
        locationTagsSelected,
        timeRange,
        rewardTagsSelected,
        typeTagsSelected,
    } = req.query
    console.log('reward', rewardTagsSelected)
    const findList = await searchExp(searchName, locationTagsSelected, timeRange, rewardTagsSelected, typeTagsSelected,)
    res.status(200).send({ message: 'success', contents: findList, });
}
