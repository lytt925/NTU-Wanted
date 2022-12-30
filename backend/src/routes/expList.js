import ExperimentModel from '../models/experiment'

const isOverLap = (rangeStart, rangeEnd, thisStart, thisEnd) => {
    let startDay = new Date(rangeStart).getTime();
    let endDay = new Date(rangeEnd).getTime();
    let expStart = new Date(thisStart).getTime();
    let expEnd = new Date(thisEnd).getTime();

    if ((startDay <= expEnd) && (endDay >= expStart)) return true
    else return false
}

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
            })
            const data = findList.filter(({ timeRange: expTimeRange }) => {
                // console.log('time', timeRange)
                // if (timeRange) {
                //     console.log('hi')
                //     return isOverLap(timeRange, ...expTimeRange,)
                // }
                // else {
                //     console.log('her')
                //     return true
                // }
            })
            return findList
        } catch (e) {
            throw e
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
    const data = await searchExp(searchTitle, locationTagsSelected, timeRange, rewardTagsSelected, typeTagsSelected,)
    if (data) {
        res.status(200).send({ message: 'success', contents: data, });
    } else {
        res.status(403).send({ message: 'failed', contents: null, })
    }
}
