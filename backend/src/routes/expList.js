import ExperimentModel from '../models/experiment'

const searchExp =
    async (searchTitle, locationTagsSelected, timeRange, rewardTagsSelected, typeTagsSelected) => {
        const filters = []
        if (searchTitle) filters.push({ "title": { $regex: `.*${searchTitle}.*`, $options: 'i' } })
        if (rewardTagsSelected) filters.push({ "rewardTags": { $in: rewardTagsSelected } })
        if (typeTagsSelected) filters.push({ "typeTags": { $in: typeTagsSelected } })
        if (locationTagsSelected) filters.push({ "locationTags": { $in: locationTagsSelected } })
        if (filters.length === 0) filters.push({})

        try {
            const findList = await ExperimentModel.find({
                $and: filters
            });
            return findList
        } catch (e) {
            throw new Error('something wrong')
        }
    }

exports.getExpList = async (req, res) => {
    const {
        searchTitle,
        locationTagsSelected,
        timeRange,
        rewardTagsSelected,
        typeTagsSelected,
    } = req.query
    const findList = await searchExp(searchTitle, locationTagsSelected, timeRange, rewardTagsSelected, typeTagsSelected,)
    if (findList) {
        res.status(200).send({ message: 'success', contents: findList, });
    } else {
        res.status(403).send({ message: 'failed', content: none, })
    }
}
